import { Point, toPoint, Pointlike } from "./Point";

/*
 * @class Bounds
 * @aka L.Bounds
 *
 * Represents a rectangular area in pixel coordinates.
 *
 * @example
 *
 * ```js
 * var p1 = L.point(10, 10),
 * p2 = L.point(40, 60),
 * bounds = L.bounds(p1, p2);
 * ```
 *
 * All Leaflet methods that accept `Bounds` objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
 *
 * ```js
 * otherBounds.intersects([[10, 10], [40, 60]]);
 * ```
 *
 * Note that `Bounds` does not inherit from Leaflet's `Class` object,
 * which means new classes can't inherit from it, and new methods
 * can't be added to it with the `include` function.
 */

export class Bounds {
  constructor();
  constructor(a: [Pointlike, Pointlike]);
  constructor(a: Pointlike, b: Pointlike);
  constructor(a?: Pointlike | [Pointlike, Pointlike], b?: Pointlike) {
    if (!a) {
      return;
    }

    let points: [Pointlike, Pointlike];

    if (b) {
      points = [a as Pointlike, b];
    } else {
      points = a as any;
    }

    this.extend(points[0]);
    this.extend(points[1]);
  }

  private min: Point;
  private max: Point;

  // @method extend(point: Point): this
  // Extends the bounds to contain the given point.
  extend(point: Pointlike) {
    // (Point)
    const _point = toPoint(point);

    // @property min: Point
    // The top left corner of the rectangle.
    // @property max: Point
    // The bottom right corner of the rectangle.
    if (!this.min && !this.max) {
      this.min = _point.clone();
      this.max = _point.clone();
    } else {
      this.min.x = Math.min(_point.x, this.min.x);
      this.max.x = Math.max(_point.x, this.max.x);
      this.min.y = Math.min(_point.y, this.min.y);
      this.max.y = Math.max(_point.y, this.max.y);
    }
    return this;
  }

  // @method getCenter(round?: Boolean): Point
  // Returns the center point of the bounds.
  getCenter(round) {
    return new Point(
      (this.min.x + this.max.x) / 2,
      (this.min.y + this.max.y) / 2,
      round
    );
  }

  // @method getBottomLeft(): Point
  // Returns the bottom-left point of the bounds.
  getBottomLeft() {
    return new Point(this.min.x, this.max.y);
  }

  // @method getTopRight(): Point
  // Returns the top-right point of the bounds.
  getTopRight() {
    // -> Point
    return new Point(this.max.x, this.min.y);
  }

  // @method getTopLeft(): Point
  // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
  getTopLeft() {
    return this.min; // left, top
  }

  // @method getBottomRight(): Point
  // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
  getBottomRight() {
    return this.max; // right, bottom
  }

  // @method getSize(): Point
  // Returns the size of the given bounds
  getSize() {
    return this.max.subtract(this.min);
  }

  // @method contains(otherBounds: Bounds): Boolean
  // Returns `true` if the rectangle contains the given one.
  // @alternative
  // @method contains(point: Point): Boolean
  // Returns `true` if the rectangle contains the given point.
  contains(obj: Boundlike | Pointlike) {
    let min: Point, max: Point;

    if (
      (Array.isArray(obj) && typeof obj[0] === "number") ||
      obj instanceof Point
    ) {
      min = max = toPoint(obj as Pointlike);
    } else {
      const bounds = toBounds(obj as Boundlike);
      min = bounds.min;
      max = bounds.max;
    }

    return (
      min.x >= this.min.x &&
      max.x <= this.max.x &&
      min.y >= this.min.y &&
      max.y <= this.max.y
    );
  }

  // @method intersects(otherBounds: Bounds): Boolean
  // Returns `true` if the rectangle intersects the given bounds. Two bounds
  // intersect if they have at least one point in common.
  intersects(bounds: Boundlike) {
    // (Bounds) -> Boolean
    const _bounds = toBounds(bounds);

    var min = this.min,
      max = this.max,
      min2 = _bounds.min,
      max2 = _bounds.max,
      xIntersects = max2.x >= min.x && min2.x <= max.x,
      yIntersects = max2.y >= min.y && min2.y <= max.y;

    return xIntersects && yIntersects;
  }

  // @method overlaps(otherBounds: Bounds): Boolean
  // Returns `true` if the rectangle overlaps the given bounds. Two bounds
  // overlap if their intersection is an area.
  overlaps(bounds: Boundlike) {
    // (Bounds) -> Boolean
    const _bounds = toBounds(bounds);

    var min = this.min,
      max = this.max,
      min2 = _bounds.min,
      max2 = _bounds.max,
      xOverlaps = max2.x > min.x && min2.x < max.x,
      yOverlaps = max2.y > min.y && min2.y < max.y;

    return xOverlaps && yOverlaps;
  }

  isValid() {
    return !!(this.min && this.max);
  }
}

export type Boundlike = [Pointlike, Pointlike] | Bounds;

// @factory L.bounds(corner1: Point, corner2: Point)
// Creates a Bounds object from two corners coordinate pairs.
// @alternative
// @factory L.bounds(points: Point[])
// Creates a Bounds object from the given array of points.
export function toBounds(a: Boundlike);
export function toBounds(a: Pointlike, b: Pointlike);
export function toBounds(a: Boundlike | Pointlike, b?: Pointlike) {
  if (!a || a instanceof Bounds) {
    return a;
  }

  return new Bounds(a as any, b);
}
