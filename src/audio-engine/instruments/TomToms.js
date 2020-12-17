'use strict';
import InstrumentBaseClass from './InstrumentBaseClass';
import Samples from '../../samples/Tom Toms [LT-MT-HT]/index'

export default class TomToms extends InstrumentBaseClass {
    static name = 'TomToms';
    static label = 'TomToms';
    static articulations = Samples
    static defaultArticulation = Object.entries(TomToms.articulations)[0];
    constructor () {
        super(TomToms.name, TomToms.articulations)
        this.parameters.articulation = TomToms.defaultArticulation;
    }
}
