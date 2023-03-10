import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StyledMemoryBlocks } from 'containers/MemoryBlocks/Styled';
import Block from './components/Block';
import Progress from './components/Progress';

import {
    selectBlocks,
    selectSideLength,
    selectLevelData,
    selectIsGameStart,
    selectLevel,
    selectIsComplete,
    selectIsCorrect,
    selectAnswer,
    selectChance,
    selectIsPlaying,
} from './selectors';
import {
    setInit,
    updateAnswer,
    updateIsComplete,
    updateIsCorrect,
    setGameRestart,
    setReplaySound,
    setIsPlaying,
} from './actions';
import {
    SOUND_EFFECT,
    DEFAULT_LEVEL,
} from './constants';
import {
    playSoundEffect,
    playLevelSound,
    flashAllBlocks,
    clearAllTimeouts,
} from './utils';
import gtag from '../../utils/tracking';

class MemoryBlocks extends Component {
    static propTypes = {
        blocks: PropTypes.instanceOf(List),
        sideLength: PropTypes.number,
        isGameStart: PropTypes.bool,
        level: PropTypes.number,
        chance: PropTypes.number,
        isComplete: PropTypes.bool,
        isCorrect: PropTypes.bool,
        handleSetInit: PropTypes.func,
        handleUpdateAnswer: PropTypes.func,
        handleSetGameRestart: PropTypes.func,
        handleSetReplaySound: PropTypes.func,
    }
    static defaultProps = {
        blocks: List(),
        sideLength: 0,
        isGameStart: false,
        level: DEFAULT_LEVEL,
        chance: 0,
        isComplete: false,
        isCorrect: true,
        handleSetInit: () => { },
        handleUpdateAnswer: () => { },
        handleSetGameRestart: () => { },
        handleSetReplaySound: () => { },
    }
    componentDidUpdate(prevProps, prevState) {
        const {
            blocks,
            levelData,
            chance,
            isComplete,
            isCorrect,
            isPlaying,
            handleUpdateIsComplete,
            handleUpdateIsCorrect,
            handleSetGameRestart,
            handleSetIsPlaying,
        } = this.props;
        // game start ???????????????
        // ??????repeat ???????????????
        // ?????????????????????????????????

        if (chance < 0) {
            clearAllTimeouts();
            handleSetGameRestart();
            return;
        }
        if (isPlaying) {
            return;
        }
        if (isComplete) {
            handleSetIsPlaying(true);
            handleUpdateIsComplete(false);
            setTimeout(() => {
                playSoundEffect(SOUND_EFFECT.correct);
                flashAllBlocks(blocks, isCorrect);
            }, 500);
            setTimeout(() => {
                const finishedTime = playLevelSound(levelData, blocks);
                setTimeout(() => {
                    handleSetIsPlaying(false);
                }, finishedTime);
            }, 3000);
        } else if (!isCorrect) {
            handleSetIsPlaying(true);
            clearAllTimeouts();
            handleUpdateIsCorrect(true);
            setTimeout(() => {
                playSoundEffect(SOUND_EFFECT.wrong);
                flashAllBlocks(blocks, isCorrect);
            }, 500);
            setTimeout(() => {
                const finishedTime = playLevelSound(levelData, blocks);
                setTimeout(() => {
                    handleSetIsPlaying(false);
                }, finishedTime);
            }, 3000);
        }
    }
    handleOnBlockClick = (event) => {
        const {
            isPlaying,
            blocks,
            handleUpdateAnswer,
        } = this.props;
        if (isPlaying) {
            return;
        }
        const blockId = event.target.getAttribute('data-id');
        const audioObject = blocks.getIn([blockId, 'audio'])();
        handleUpdateAnswer(parseInt(blockId, 10));
        audioObject.currentTime = 0;
        audioObject.play();
        gtag('event', 'Block Click');
    }
    handleOnGameStart = () => {
        const {
            levelData,
            blocks,
            isCorrect,
            handleSetInit,
            handleSetIsPlaying,
        } = this.props;
        handleSetInit();
        handleSetIsPlaying(true);
        playSoundEffect(SOUND_EFFECT.correct);
        flashAllBlocks(blocks, isCorrect);
        setTimeout(() => {
            const finishedTime = playLevelSound(levelData, blocks);
            setTimeout(() => {
                handleSetIsPlaying(false);
            }, finishedTime);
        }, 2000);
        gtag('event', 'Start');
    }
    handleOnGameRestart = () => {
        const {
            handleSetGameRestart,
        } = this.props;
        clearAllTimeouts();
        handleSetGameRestart();
        gtag('event', 'Restart');
    }
    handleOnReplaySound = () => {
        const {
            levelData,
            blocks,
            chance,
            handleSetReplaySound,
            handleSetIsPlaying,
        } = this.props;
        if (!chance) {
            return;
        }
        clearAllTimeouts();
        handleSetIsPlaying(true);
        handleSetReplaySound();
        setTimeout(() => {
            const finishedTime = playLevelSound(levelData, blocks);
            setTimeout(() => {
                handleSetIsPlaying(false);
            }, finishedTime);
        }, 500);
        gtag('event', 'Replay');
    }
    render() {
        const {
            levelData,
            answer,
            isGameStart,
            blocks,
            sideLength,
            level,
            chance,
        } = this.props;
        return (
            <StyledMemoryBlocks sideLength={sideLength}>
                <div className="memory-blocks__title-wrapper">
                    <div>Memory</div>
                    <div>Blocks</div>
                </div>
                <div className="memory-blocks__info">Level {level}</div>
                <div className="memory-blocks__blocks-wrapper">
                    {
                        blocks.map((block) => (
                            <Block
                                key={block.get('id')}
                                blockId={block.get('id')}
                                sideLength={sideLength}
                                handleOnClick={this.handleOnBlockClick}
                            />
                        ))
                    }
                    {
                        !isGameStart &&
                        <div className="memory-blocks__panel">
                            <button
                                className="memory-blocks__start-btn"
                                onClick={this.handleOnGameStart}
                            >
                                Start
                            </button>
                        </div>
                    }
                </div>
                <Progress
                    levelData={levelData}
                    answer={answer}
                />
                {
                    isGameStart &&
                    <div className="memory-blocks__group-btn-wrapper">
                        <button className="memory-blocks__hint-btn memory-blocks__font-music" onClick={this.handleOnReplaySound}>
                            <i className="fas fa-music memory-blocks__font-music" />
                            <span> x {chance}</span>
                        </button>
                        <button className="memory-blocks__restart-btn" onClick={this.handleOnGameRestart}>Restart</button>
                    </div>
                }
            </StyledMemoryBlocks>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    blocks: selectBlocks(),
    sideLength: selectSideLength(),
    levelData: selectLevelData(),
    answer: selectAnswer(),
    isGameStart: selectIsGameStart(),
    level: selectLevel(),
    isComplete: selectIsComplete(),
    isCorrect: selectIsCorrect(),
    isPlaying: selectIsPlaying(),
    chance: selectChance(),
});

const mapDispatchToProps = dispatch => ({
    handleSetInit: () => dispatch(setInit()),
    handleSetGameRestart: () => dispatch(setGameRestart()),
    handleSetReplaySound: () => dispatch(setReplaySound()),
    handleUpdateAnswer: (note) => dispatch(updateAnswer(note)),
    handleUpdateIsComplete: (isComplete) => dispatch(updateIsComplete(isComplete)),
    handleUpdateIsCorrect: (isCorrect) => dispatch(updateIsCorrect(isCorrect)),
    handleSetIsPlaying: (isPlaying) => dispatch(setIsPlaying(isPlaying)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MemoryBlocks);
