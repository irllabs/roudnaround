import React, { useState, useCallback, useEffect, useContext } from 'react'
import { connect, ReactReduxContext, Provider, useDispatch } from "react-redux";
import Slider from '@material-ui/core/Slider';
import _ from 'lodash'
import styles from './LayerSettings.scss'
import AudioEngine from '../../audio-engine/AudioEngine'
import { convertPercentToDB, convertDBToPercent, numberRange } from '../../utils/index'
import { updateLayerInstrument } from '../../redux/actions'
import { SET_LAYER_NAME, SET_LAYER_GAIN } from '../../redux/actionTypes'
import { FirebaseContext } from '../../firebase';

export default function VolumeSlider ({ selectedLayer, user, roundId }) {
    const dispatch = useDispatch();
    const firebase = useContext(FirebaseContext);
    const [sliderValue, setSliderValue] = useState(80)
    const updateVolumeState = (dB, selectedLayerId) => {
        dispatch({ type: SET_LAYER_GAIN, payload: { id: selectedLayerId, value: dB, user: user.id } })
        firebase.updateLayer(roundId, selectedLayer.id, { gain: dB })
    }
    const updateVolumeStateThrottled = useCallback(_.throttle(function (dB, selectedLayerId) {
        updateVolumeState(dB, selectedLayerId)
    }, 2000), []);
    const onSliderChange = (e, percent) => {
        setSliderValue(percent)
        const dB = convertPercentToDB(percent)
        AudioEngine.tracksById[selectedLayer.id].setVolume(dB)
        updateVolumeStateThrottled(dB, selectedLayer.id)
    }

    useEffect(() => {
        //console.log('selectedLayer.id changed', selectedLayer.id, selectedLayer.instrument.gain);
        setSliderValue(convertDBToPercent(selectedLayer.gain))
    }, [selectedLayer.id])

    const verticalSliderMarks = [
        {
            value: 100,
            label: '+6',
        },
        {
            value: 80,
            label: '0',
        },
        {
            value: 60,
            label: '-6',
        },

        {
            value: 34,
            label: '-24',
        },

        {
            value: 0,
            label: '-96',
        }
    ];
    //console.log('rendering volume slider', selectedLayer.id);
    return (

        <div className={`${styles.layerSettingsVolumeSlider}`}>
            <Slider
                orientation="vertical"
                value={sliderValue}
                min={0}
                max={100}
                aria-labelledby="vertical-slider"
                marks={verticalSliderMarks}
                onChange={onSliderChange}
            />
        </div>
    )
}
