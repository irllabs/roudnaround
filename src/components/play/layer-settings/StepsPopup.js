import React, { useContext } from 'react'
import { useDispatch } from "react-redux";
import { Box, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import LayerPercentOffset from './LayerPercentOffset'
import IconButton from '@material-ui/core/IconButton'

import { SET_LAYER_STEPS } from '../../../redux/actionTypes'
import { FirebaseContext } from '../../../firebase';
import { changeLayerLength } from '../../../utils/index'

import Minus from './resources/svg/minus.svg'
import Plus from './resources/svg/plus.svg'

const styles = theme => ({
    root: {
        position: 'absolute',
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        left: 0,
        bottom: 45,
        justifyContent: "flex-start",
        alignItems: "center",
        width: 180,
        minHeight: 48,
        backgroundColor: '#333333',
        transition: 'opacity 0.2s ease-in',
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15), 0px 4px 6px rgba(0, 0, 0, 0.15)',
        zIndex: 100,
        [theme.breakpoints.down('md')]: {
            //height: 48,
        },
    },
    offsetSlider: {
        width: '100%',
        padding: 10,
    },
    stepCount: {
        padding: 10,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    stepButtons: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: 30,
        height: 30
    },
    hidden: {
        opacity: 0,
        position: 'absolute',
        top: '200%',
        transition: 'opacity 0.2s ease-out'
    },
    stepControls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    stepsInput: {
        textAlign: 'center',
        color: 'white',
        padding: 0,
        margin: 0,
        border: 'none',
        width: 20,
        outline: 'none',
        backgroundColor: 'transparent'
    }
})

const StepsDisplay = ({ steps, user, round, classes, selectedLayer }) => {
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    const onNumberOfStepsChange = (steps) => {
        const newSteps = changeLayerLength(selectedLayer, steps)
        dispatch({ type: SET_LAYER_STEPS, payload: { id: selectedLayer.id, steps: newSteps, user: user.id } })
        firebase.updateLayer(round.id, selectedLayer.id, selectedLayer)
    }

    const increaseSteps = () => onNumberOfStepsChange(steps + 1)

    const decreaseSteps = () => {
        if (steps > 1)
            onNumberOfStepsChange(steps - 1)
    }
    return (
        <Box style={{ borderBottom: 'thin solid rgba(255, 255, 255, 0.1)', padding: 20 }}>
            <Typography id="step-count" variant="caption" gutterBottom>Steps</Typography>
            <Box className={classes.stepControls}>
                <IconButton onClick={decreaseSteps} className={classes.stepButtons}>
                    <img alt='less' src={Minus} />
                </IconButton>
                <Box className={classes.stepCount}>
                    <input disabled className={classes.stepsInput} value={steps || 0} />
                </Box>
                <IconButton onClick={increaseSteps} className={classes.stepButtons}>
                    <img alt='more' src={Plus} />
                </IconButton>
            </Box>
        </Box>
    )
}

const StepsPopup = ({
    classes,
    round,
    user,
    showStepPopup,
    playUIRef,
    selectedLayer
}) => {
    return (
        <Box className={showStepPopup ? classes.root : classes.hidden}>
            <Box style={{ width: '100%' }}>
                <StepsDisplay
                    steps={selectedLayer?.steps?.length}
                    classes={classes}
                    user={user}
                    round={round}
                    selectedLayer={selectedLayer}
                />
            </Box>
            <Box className={classes.offsetSlider}>
                <LayerPercentOffset horizontal={true} selectedLayer={selectedLayer} roundId={round.id} user={user} playUIRef={playUIRef} />
            </Box>
        </Box>
    )
}

export default withStyles(styles)(StepsPopup)
