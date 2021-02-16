import React, { Component } from 'react'
import { connect } from "react-redux";
import { Drawer } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import _ from 'lodash'
import { SET_LAYER_MUTE, REMOVE_LAYER, SET_IS_SHOWING_LAYER_SETTINGS, SET_LAYER_STEPS } from '../../../redux/actionTypes'
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
//import { convertPercentToDB, convertDBToPercent, numberRange } from '../../../utils/index'
import AudioEngine from '../../../audio-engine/AudioEngine'

import VolumeSlider from './VolumeSlider'
import LayerInstrument from './LayerInstrument'
import LayerNumberOfSteps from './LayerNumberOfSteps'
import { FirebaseContext } from '../../../firebase';
import LayerType from './LayerType';
import LayerAutomation from './LayerAutomation';
import Track from '../../../audio-engine/Track'
import LayerTimeOffset from './LayerTimeOffset'

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
        '& > *': {
            marginBottom: '1rem'
        },
        paddingTop: '2rem'
    }
})

class LayerSettings extends Component {
    static contextType = FirebaseContext;

    onCloseClick () {
        this.props.dispatch({ type: SET_IS_SHOWING_LAYER_SETTINGS, payload: { value: false } })
    }

    onPreviewClick () {
        // todo: only audible to this user (mute for all others)
    }

    onMuteClick () {
        const isMuted = !this.props.selectedLayer.instrument.isMuted
        AudioEngine.tracksById[this.props.selectedLayer.id].setMute(isMuted)
        this.props.dispatch({ type: SET_LAYER_MUTE, payload: { id: this.props.selectedLayer.id, value: isMuted, user: this.props.user.id } })
    }

    onDeleteLayerClick () {
        this.props.dispatch({ type: REMOVE_LAYER, payload: { id: this.props.selectedLayer.id, user: this.props.user.id } })
        this.context.deleteLayer(this.props.round.id, this.props.selectedLayer.id)
        this.onCloseClick()
    }

    onClearStepsClick () {
        let selectedLayerClone = _.cloneDeep(this.props.selectedLayer)
        for (let step of selectedLayerClone.steps) {
            step.isOn = false
        }
        this.props.dispatch({ type: SET_LAYER_STEPS, payload: { id: selectedLayerClone.id, steps: selectedLayerClone.steps } })
        this.context.updateLayer(this.props.round.id, selectedLayerClone.id, { steps: selectedLayerClone.steps })
    }

    render () {
        // console.log('Layer settings render()', this.props.user);
        const { classes } = this.props
        const selectedLayer = this.props.selectedLayer
        let form = '';
        if (!_.isNil(selectedLayer)) {
            //layerVolumePercent = convertDBToPercent(selectedLayer.instrument.gain)
            let layerTypeFormItems;
            if (selectedLayer.type === Track.TRACK_TYPE_AUTOMATION) {
                layerTypeFormItems = (
                    <LayerAutomation selectedLayer={selectedLayer} roundId={this.props.round.id} userId={this.props.user.id} />
                )
            } else {
                layerTypeFormItems = (
                    <>
                        <LayerInstrument selectedLayer={selectedLayer} roundId={this.props.round.id} user={this.props.user} />
                        <div className={`${styles.layerSettingsVolumeSlider}`}>
                            <VolumeSlider selectedLayer={selectedLayer} roundId={this.props.round.id} user={this.props.user} />
                        </div>
                        <Box display="flex" justifyContent="space-evenly">

                            <Button onClick={this.onMuteClick.bind(this)} variant={selectedLayer.instrument.isMuted ? 'contained' : 'outlined'} disableElevation>Mute</Button>
                        </Box>
                    </>
                )
            }
            form = (
                <Box className={classes.root}>

                    <LayerType selectedLayer={selectedLayer} roundId={this.props.round.id} userId={this.props.user.id} />
                    <LayerNumberOfSteps selectedLayer={selectedLayer} roundId={this.props.round.id} user={this.props.user} />
                    <LayerTimeOffset selectedLayer={selectedLayer} roundId={this.props.round.id} user={this.props.user} playUIRef={this.props.playUIRef} />
                    {layerTypeFormItems}
                    <Button onClick={this.onClearStepsClick.bind(this)} variant="outlined" disableElevation>Clear steps</Button>
                    <Button onClick={this.onDeleteLayerClick.bind(this)} variant="outlined" disableElevation>Delete layer</Button>
                </Box>
            )
        }
        return (
            <div>
                <Drawer
                    open={this.props.isOpen}
                    variant={"persistent"}
                    bgcolor="secondary"
                >

                    {form}

                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    //  console.log('mapStateToProps', state);
    let selectedLayer = null;
    if (!_.isNil(state.display.selectedLayerId)) {
        selectedLayer = _.find(state.round.layers, { id: state.display.selectedLayerId })
    }
    return {
        round: state.round,
        user: state.user,
        selectedLayer,
        isOpen: state.display.isShowingLayerSettings
    };
};


export default connect(
    mapStateToProps
)(withStyles(styles)(LayerSettings))