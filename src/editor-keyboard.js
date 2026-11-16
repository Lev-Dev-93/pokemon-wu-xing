// Phase 9: pure keyboard movement planner; commits remain subject to runtime validation.
export function keyboardMove(key, object, columns, rows) {
  if (!object || !Number.isInteger(columns) || !Number.isInteger(rows)) return null;
  const steps = {ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
  const delta = steps[key];
  if (!delta) return null;
  const x=object.x+delta[0],y=object.y+delta[1];
  return x>=0 && y>=0 && x+object.w<=columns && y+object.h<=rows ? {x,y} : null;
}
