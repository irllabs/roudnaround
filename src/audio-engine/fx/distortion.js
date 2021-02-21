
import FXBaseClass from './fx-base-class';
import _ from 'lodash';
import * as Tone from 'tone';

export default class Distortion extends FXBaseClass {
    static fxName = 'distortion';
    static icon = '<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8223 0.407959L15.9002 10.5518L15.301 8.95412L14.5331 9.96206L13.3932 4.47667L12.2848 6.69355L10.6478 0.571961L8.99997 6.9993L8.30451 10.7742L7.22659 5.87692L6.07754 9.10863L5.08256 5.81274L3.68175 9.71049L1.63217 5.39221L0.0268803 13.0173V16.9993L1.97304 13.4813L2.36776 11.6064L3.93723 14.9131L4.91737 12.1859L5.92239 15.515L6.81731 12.998L8.36566 16.8427L9.49997 13.0445L10.4682 7.64224L11.7151 12.3051L12.6067 10.5219L13.4669 14.6615L14.6989 13.0445L15.9002 15.0898C16.0639 15.5266 16.8946 16.3874 16.8223 16.4993C16.8223 16.4993 16.9577 15.4638 17 14.9993L18.1776 7.59065L20 8.95412L16.8223 0.407959Z" fill="white" fill-opacity="0.9"/></svg>'

    constructor (fxParameters) {
        super(fxParameters)
        this._amount = 4
        this._mix = 0.2
        this._mixBeforeBypass = this._mix
        this.label = 'Distortion'
        this.isOn = fxParameters.isOn
    }

    setAmount (value, time) {
        this._amount = value
        if (this.isOn) {
            this.fx.distortion = value
        }
    }
    setMix (value, time) {
        this._mix = value
        if (this.isOn) {
            if (!_.isNil(time)) {
                this.fx.wet.setValueAtTime(value, time)
            } else {
                this.fx.wet.value = value
            }
        }
    }
    setBypass (value, time) {
        if (value === true && !this._override) {
            // set mix to 0 rather than turn off so that we can do this rapidly without needing to rebuild the audio chain
            if (this._mix > 0) {
                this._mixBeforeBypass = this._mix
            }
            this.setMix(0, time)
        } else {
            this.setMix(this._mixBeforeBypass, time)
        }
    }


    enable () {
        this.fx = new Tone.Distortion(this._amount)
        this.fx.wet.value = this._mix
        this.setBypass(true)
    }

    getAutomationOptions () {
        return [
            {
                label: 'Enabled',
                name: 'enabled',
                setParameter: this.setBypass.bind(this),
                calculateValue: function (value) {
                    return value === false ? true : false
                }
            }
        ]
    }
}
