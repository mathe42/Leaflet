import { CRS } from './CRS';
import { LonLat } from '../projection/Projection.LonLat';
import { toTransformation } from '../../geometry/Transformation';
import { LatLng } from '../LatLng';

/*
 * @namespace CRS
 * @crs L.CRS.Simple
 *
 * A simple CRS that maps longitude and latitude into `x` and `y` directly.
 * May be used for maps of flat surfaces (e.g. game maps). Note that the `y`
 * axis should still be inverted (going from bottom to top). `distance()` returns
 * simple euclidean distance.
 */

export class Simple extends CRS {
  projection = LonLat;
  transformation = toTransformation(1, 0, -1, 0);
  infinite = true;

  scale(zoom: number) {
    return Math.pow(2, zoom);
  }

  zoom(scale: number) {
    return Math.log(scale) / Math.LN2;
  }

  distance(latlng1: LatLng, latlng2: LatLng): number {
    var dx = latlng2.lng - latlng1.lng,
      dy = latlng2.lat - latlng1.lat;

    return Math.sqrt(dx * dx + dy * dy);
  }
}

export const simple = new Simple()