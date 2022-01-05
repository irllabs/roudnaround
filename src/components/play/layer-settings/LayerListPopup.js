import React from 'react'
import { Box, Typography, IconButton } from '@material-ui/core'

import VolumeSlider from './VolumeSlider'


const LayerListPopup = ({
    classes,
    showMixerPopup,
    height,
    selectedInstrument,
    instrumentIcon,
    onMuteClick,
    toggleShowMixerPopup,
    onLayerSelect,
    ref,
    userColors,
    user,
    round,
    Close
}) => (
    <Box className={showMixerPopup ? classes.mixerPopup : classes.hidden} style={height < 400 ? { height: height - 142, top: -(height - 138) } : {}}>
        <Box className={classes.mixerPopupHeader} style={{ flex: 1 }}>
            <IconButton className={classes.plainButton} style={{ width: 16, height: 16 }} onClick={toggleShowMixerPopup}>
                <img alt='close popup' src={Close} />
            </IconButton>
            <Typography className={classes.mixerPopupHeaderText}>Mixer</Typography>
        </Box>
        <Box className={classes.layerContainer} style={{ flex: 10 }}>
            {
                round && round?.layers.map((layer, i) =>
                    <Box
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onLayerSelect(layer.id)
                        }}
                        key={i}
                        className={classes.layerSubContainer}
                    >
                        <Box className={classes.layer} style={(round.layers.length - 1) === i ? { borderBottom: 'none' } : {}}>
                            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', flex: 4 }}>
                                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 5 }}>
                                    <Box style={{ marginRight: 5 }}>
                                        {instrumentIcon(layer?.instrument?.sampler)}
                                    </Box>
                                    <Typography style={{ textTransform: 'capitalize', display: 'flex', alignItems: 'flex-start', lineHeight: 1 }}>
                                        {layer.instrument?.sample}
                                    </Typography>
                                </Box>
                                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 36, height: 20 }}>
                                    <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                                        {userColors && layer && layer.createdBy && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="6" cy="6" r="5" stroke={userColors[layer.createdBy]} strokeWidth="2" />
                                        </svg>}
                                    </Box>
                                    <Typography className={classes.stepLength}>{layer.steps.length}</Typography>
                                </Box>
                            </Box>
                            <Box className={classes.volumeSliderContainer}>
                                <VolumeSlider hideText={true} selectedLayer={layer} roundId={round.id} user={user} />
                            </Box>
                            <Box className={classes.containerSoloMute}>
                                <IconButton className={classes.mixerButton}>
                                    <Typography style={{ fontWeight: 'bold' }}>S</Typography>
                                </IconButton>
                                <IconButton onClick={() => onMuteClick(layer)} className={classes.mixerButton}>
                                    <Typography style={{ fontWeight: 'bold' }}>M</Typography>
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>)
            }
        </Box>
    </Box>
)

export default LayerListPopup 