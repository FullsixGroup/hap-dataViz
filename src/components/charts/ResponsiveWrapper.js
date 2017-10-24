/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Measure from 'react-measure'

export default class ResponsiveWrapper extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }

    state = {
        dimensions: {
            width: -1,
            height: -1,
        },
    }

    componentDidMount() {
        setTimeout(() => {
            const target = this.wrapper.querySelector('.bottom')
            if (target) {
                this.wrapper.style.marginBottom = `${target.getBoundingClientRect().height}px`
            }
        }, 200)
    }

    render() {
        const { width, height } = this.state.dimensions

        const shouldRender = width > 0 && height > 0

        return (
            <div
                ref={node => {
                    this.wrapper = node
                }}
                style={{ width: '100%', height: '100%' }}
            >
                <Measure
                    bounds
                    onResize={contentRect => {
                        console.log(contentRect)
                        this.setState({ dimensions: contentRect.bounds })
                    }}
                >
                    {({ measureRef }) => (
                        <div ref={measureRef} style={{ width: '100%', height: '100%' }}>
                            {shouldRender && this.props.children({ width, height })}
                        </div>
                    )}
                </Measure>
            </div>
        )
    }
}
