/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import BasicTooltip from '../../tooltip/BasicTooltip'

const BarItem = ({
    data,

    x,
    y,
    width,
    height,
    borderRadius,
    color,
    borderWidth,
    borderColor,
    chartHeight,
    chartWidth,
    colors,
    lastColorBar,
    colorBubble,
    indexNumb,
    indexNumbNormalize,
    layout,

    label,
    shouldRenderLabel,
    labelColor,

    showTooltip,
    hideTooltip,
    onClick,

    theme,
}) => {
    const handleTooltip = e =>
        showTooltip(
            <BasicTooltip
                id={`${data.id}`}
                value={data.value}
                enableChip
                color={color}
                theme={theme}
            />,
            e
        )

    const handleToolTipIndex = (index, e) =>
        showTooltip(
            <BasicTooltip
                id={'Index'}
                value={data.data.indexNumb[`${index}`]}
                enableChip
                color={colors[colorBubble]}
                theme={theme}
            />,
            e
        )

    return (
        <g>
            <g transform={`translate(${x}, ${y})`}>
                <rect
                    width={width}
                    height={height}
                    rx={borderRadius}
                    ry={borderRadius}
                    fill={data.fill ? data.fill : color}
                    strokeWidth={borderWidth}
                    stroke={borderColor}
                    onMouseEnter={handleTooltip}
                    onMouseMove={handleTooltip}
                    onMouseLeave={hideTooltip}
                    onClick={onClick}
                />
                {shouldRenderLabel && (
                    <text
                        x={width / 2}
                        y={height / 2}
                        textAnchor="middle"
                        alignmentBaseline="central"
                        style={{
                            pointerEvents: 'none',
                            fill: labelColor,
                        }}
                    >
                        {label}
                    </text>
                )}
            </g>

            {color === colors[lastColorBar] &&
                layout === 'vertical' &&
                indexNumbNormalize.map((item, index) => {
                    const posX =
                        item === indexNumbNormalize[0] && indexNumbNormalize.length > 1
                            ? x - width
                            : x
                    const i = index + 1
                    return (
                        <g key={i} transform={`translate(${posX}, ${chartHeight})`}>
                            <circle
                                cx={0}
                                cy={-item}
                                r={10}
                                fill={colors[colorBubble]}
                                onMouseEnter={e => handleToolTipIndex(index, e)}
                                onMouseMove={e => handleToolTipIndex(index, e)}
                                onMouseLeave={hideTooltip}
                            />
                        </g>
                    )
                })}

            {color === colors[lastColorBar] &&
            layout === 'horizontal' && (
                <g transform={`translate(${chartWidth}, ${y})`}>
                    <circle
                        cx={-indexNumbNormalize}
                        cy={0}
                        r={10}
                        fill={colors[colorBubble]}
                        onMouseEnter={handleToolTipIndex}
                        onMouseMove={handleToolTipIndex}
                        onMouseLeave={hideTooltip}
                    />
                </g>
            )}
        </g>
    )
}

BarItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        indexValue: PropTypes.string.isRequired,
    }).isRequired,

    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderRadius: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    shouldRenderLabel: PropTypes.bool.isRequired,
    labelColor: PropTypes.string.isRequired,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,

    theme: PropTypes.shape({
        tooltip: PropTypes.shape({}).isRequired,
    }).isRequired,
}

const enhance = compose(
    withPropsOnChange(['data', 'onClick'], ({ data, onClick }) => ({
        onClick: event => onClick(data, event),
    })),
    pure
)

export default enhance(BarItem)
