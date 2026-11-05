import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluate,read} from './recipeCorrectionTestSupport.mjs';

function setup({desktop=true,available=250,height=200}={}) {
  const events=()=>({handlers:new Map(),addEventListener(name,fn){this.handlers.set(name,fn);},removeEventListener(name){this.handlers.delete(name);},emit(name){this.handlers.get(name)?.();}});
  const summary=events(),media={...events(),matches:desktop};
  const frames=new Map();let next=0,observer,focused=null;
  const document={activeElement:null};
  const window={...events(),matchMedia:()=>media,requestAnimationFrame(fn){frames.set(++next,fn);return next;},cancelAnimationFrame(id){frames.delete(id);}};
  const sections={dataset:{}};
  let ingredientsBottom=400+available,methodBottom=382;
  const ingredients={parentElement:sections,getBoundingClientRect:()=>({bottom:ingredientsBottom})};
  const methodColumn={getBoundingClientRect:()=>({bottom:methodBottom})};
  const guide={open:false,querySelector:()=>summary,contains:element=>focused!==null&&element===focused,getBoundingClientRect(){return{top:Math.min(ingredientsBottom,methodBottom)+18,height:this.open?height:70};}};
  class ResizeObserver {
    constructor(fn){this.resize=fn;this.observed=[];observer=this;}
    observe(element){this.observed.push(element);}
    disconnect(){this.disconnected=true;}
  }
  const {watchRecipeGuideLayout}=evaluate(read('lib/recipeGuideLayout.ts'),{window,document,ResizeObserver});
  const cleanup=watchRecipeGuideLayout(ingredients,guide,methodColumn);
  const flush=()=>{const queued=[...frames.values()];frames.clear();queued.forEach(fn=>fn());};
  return {guide,sections,media,summary,window,observer,frames,cleanup,flush,setSpace(value){ingredientsBottom=400+value;observer.resize();},setColumns(left,right){ingredientsBottom=left;methodBottom=right;observer.resize();},focus(){focused={};document.activeElement=focused;}};
}

test('desktop opens the complete guide only when its actual height fits the remaining ingredient space',()=>{
  const fits=setup({available:200,height:200});fits.flush();assert.equal(fits.guide.open,true);
  assert.equal(fits.observer.observed.length,2);
  assert.equal(fits.sections.dataset.guidePlacement,'nutrition');
  assert.ok(!fits.observer.observed.includes(fits.guide),'guide is not observed, avoiding resize loops');
  const short=setup({available:199,height:200});short.flush();assert.equal(short.guide.open,false);
  const mobile=setup({desktop:false,available:1000});mobile.flush();assert.equal(mobile.guide.open,false);
});

test('the guide fills the shorter column and can change sides as the layout changes',()=>{
  const view=setup();view.flush();assert.equal(view.sections.dataset.guidePlacement,'nutrition');
  view.setColumns(250,650);view.flush();
  assert.equal(view.sections.dataset.guidePlacement,'ingredients');assert.equal(view.guide.open,true);
  view.setColumns(650,600);view.flush();
  assert.equal(view.sections.dataset.guidePlacement,'nutrition');assert.equal(view.guide.open,false);
  view.setColumns(650,650);view.flush();
  assert.equal(view.sections.dataset.guidePlacement,'nutrition');assert.equal(view.guide.open,false);
});

test('layout changes recheck available space and return untouched guides to collapsed on mobile',()=>{
  const view=setup();view.flush();assert.equal(view.guide.open,true);
  view.setSpace(100);view.flush();assert.equal(view.guide.open,false);
  view.setSpace(300);view.flush();assert.equal(view.guide.open,true);
  view.media.matches=false;view.media.emit('change');view.flush();assert.equal(view.guide.open,false);
});

test('manual native disclosure choices and focused guide content are not overridden',()=>{
  for(const initial of [true,false]){
    const view=setup({available:initial?300:100});view.flush();
    // Native summary activation generates click for mouse, Enter and Space.
    view.summary.emit('click');view.guide.open=!initial;
    view.setSpace(initial?1000:0);view.flush();assert.equal(view.guide.open,!initial);
  }
  const focused=setup();focused.flush();focused.focus();focused.setSpace(0);focused.flush();
  assert.equal(focused.guide.open,true,'does not hide focused content');
});

test('unmount cancels pending measurements and removes layout observers and listeners',()=>{
  const view=setup();assert.equal(view.frames.size,1);view.cleanup();view.flush();
  assert.equal(view.guide.open,false);
  assert.equal(view.observer.disconnected,true);
  assert.equal(view.summary.handlers.size,0);
  assert.equal(view.media.handlers.size,0);
  assert.equal(view.window.handlers.size,0);
  view.observer.resize();assert.equal(view.frames.size,0);
});
