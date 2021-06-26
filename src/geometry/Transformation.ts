import { Point } from "./Point";

/*
 * @class Transformation
 * @aka L.Transformation
 *
 * Represents an affine transformation: a set of coefficients `a`, `b`, `c`, `d`
 * for transforming a point of a form `(x, y)` into `(a*x + b, c*y + d)` and doing
 * the reverse. Used by Leaflet in its projections code.
 *
 * @example
 *
 * ```js
 * var transformation = L.transformation(2, 5, -1, 10),
 * 	p = L.point(1, 2),
 * 	p2 = transformation.transform(p), //  L.point(7, 8)
 * 	p3 = transformation.untransform(p2); //  L.point(1, 2)
 * ```
 */

// factory new L.Transformation(a: Number, b: Number, c: Number, d: Number)
// Creates a `Transformation` object with the given coefficients.
export class Transformation {
  #a: number;
  #b: number;
  #c: number;
  #d: number;

  constructor(a: [number, number, number, number]);
  constructor(a: number, b: number, c: number, d: number);
  constructor(
    a: number | [number, number, number, number],
    b?: number,
    c?: number,
    d?: number
  ) {
    if (Array.isArray(a)) {
      // use array properties
      this.#a = a[0];
      this.#b = a[1];
      this.#c = a[2];
      this.#d = a[3];
      return;
    }
    this.#a = a;
    this.#b = b;
    this.#c = c;
    this.#d = d;
  }

  // @method transform(point: Point, scale?: Number): Point
  // Returns a transformed point, optionally multiplied by the given scale.
  // Only accepts actual `L.Point` instances, not arrays.
  transform(point: Point, scale: number = 1) {
    // (Point, Number) -> Point
    return this._transform(point.clone(), scale);
  }

  // destructive transform (faster)
  _transform(point: Point, scale: number = 1) {
    point.x = scale * (this.#a * point.x + this.#b);
    point.y = scale * (this.#c * point.y + this.#d);
    return point;
  }

  // @method untransform(point: Point, scale?: Number): Point
  // Returns the reverse transformation of the given point, optionally divided
  // by the given scale. Only accepts actual `L.Point` instances, not arrays.
  untransform(point: Point, scale: number = 1) {
    return new Point(
      (point.x / scale - this.#b) / this.#a,
      (point.y / scale - this.#d) / this.#c
    );
  }
}

// factory L.transformation(a: Number, b: Number, c: Number, d: Number)

// @factory L.transformation(a: Number, b: Number, c: Number, d: Number)
// Instantiates a Transformation object with the given coefficients.

// @alternative
// @factory L.transformation(coefficients: Array): Transformation
// Expects an coefficients array of the form
// `[a: Number, b: Number, c: Number, d: Number]`.
export function toTransformation(a: [number, number, number, number]);
export function toTransformation(a: number, b: number, c: number, d: number);
export function toTransformation(
  a: number | [number, number, number, number],
  b?: number,
  c?: number,
  d?: number
) {
  return new Transformation(a as any, b, c, d);
}
