import { Earth } from './CRS.Earth';
import { Mercator } from '../projection/Projection.Mercator';
import { toTransformation } from '../../geometry/Transformation';

/*
 * @namespace CRS
 * @crs L.CRS.EPSG3395
 *
 * Rarely used by some commercial tile providers. Uses Elliptical Mercator projection.
 */
export class EPSG3395 extends Earth {
	code = 'EPSG:3395'
	projection = Mercator

	constructor() {
		super()
		var scale = 0.5 / (Math.PI * Mercator.R);
		this.transformation = toTransformation(scale, 0.5, -scale, 0.5);
	}
}
