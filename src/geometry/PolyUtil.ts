import * as LineUtil from "./LineUtil";
import { Point } from "./Point";

/*
 * @namespace PolyUtil
 * Various utility functions for polygon geometries.
 */

const code = new WeakMap<Point, number>();

/* @function clipPolygon(points: Point[], bounds: Bounds, round?: Boolean): Point[]
 * Clips the polygon geometry defined by the given `points` by the given bounds (using the [Sutherland-Hodgman algorithm](https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm)).
 * Used by Leaflet to only show polygon points that are on the screen or near, increasing
 * performance. Note that polygon points needs different algorithm for clipping
 * than polyline, so there's a separate method for it.
 */
export function clipPolygon(points: Point[], bounds, round) {
  var clippedPoints,
    edges = [1, 4, 2, 8],
    a: Point,
    b: Point,
    edge,
    p: Point;

  for (let i = 0, len = points.length; i < len; i++) {
    code.set(points[i], LineUtil._getBitCode(points[i], bounds));
  }

  // for each edge (left, bottom, right, top)
  for (let k = 0; k < 4; k++) {
    edge = edges[k];
    clippedPoints = [];

    for (let i = 0, len = points.length, j = len - 1; i < len; j = i++) {
      a = points[i];
      b = points[j];

      // if a is inside the clip window
      if (!(code.get(a) & edge)) {
        // if b is outside the clip window (a->b goes out of screen)
        if (code.get(b) & edge) {
          p = LineUtil._getEdgeIntersection(b, a, edge, bounds, round);
          code.set(p, LineUtil._getBitCode(p, bounds));
          clippedPoints.push(p);
        }
        clippedPoints.push(a);

        // else if b is inside the clip window (a->b enters the screen)
      } else if (!(code.get(b) & edge)) {
        p = LineUtil._getEdgeIntersection(b, a, edge, bounds, round);
        code.set(p, LineUtil._getBitCode(p, bounds));
        clippedPoints.push(p);
      }
    }
    points = clippedPoints;
  }

  return points;
}
