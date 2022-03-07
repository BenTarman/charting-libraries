import React, { useEffect } from "react";
import * as d3 from "d3"; // Import D3
import styled from "styled-components";

function makeAreaChart() {
    const lineChartData = [
        {
            violations: "Violation",
            values: [
                {
                    date: "2020/1/22",
                    close: 230,
                },
                {
                    date: "2020/2/1",
                    close: 269,
                },
                {
                    date: "2020/2/15",
                    close: 234,
                },
                {
                    date: "2020/3/1",
                    close: 282,
                },
            ],
        },
    ];

    const margin = {
        top: 20,
        bottom: 20,
        left: 50,
        right: 20,
    };

    const width = 700 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const createGradient = (select) => {
        const gradient = select
            .select("defs")
            .append("linearGradient")
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("y1", "100%")
            .attr("x2", "0%")
            .attr("y2", "0%");

        gradient
            .append("stop")
            .attr("offset", "0%")
            .attr("style", "stop-color:#BBF6CA;stop-opacity:0.05");

        gradient
            .append("stop")
            .attr("offset", "100%")
            .attr("style", "stop-color:#BBF6CA;stop-opacity:.5");
    };

    const createGlowFilter = (select) => {
        const filter = select
            .select("defs")
            .append("filter")
            .attr("id", "glow");

        filter
            .append("feGaussianBlur")
            .attr("stdDeviation", "4")
            .attr("result", "coloredBlur");

        const femerge = filter.append("feMerge");

        femerge.append("feMergeNode").attr("in", "coloredBlur");
        femerge.append("feMergeNode").attr("in", "SourceGraphic");
    };

    const svg = d3
        .select("#line-chart")
        .append("svg")
        .attr("width", 700 + margin.left + margin.right)
        .attr("height", 300 + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg.append("defs");
    svg.call(createGradient);
    svg.call(createGlowFilter);

    const parseTime = d3.timeParse("%Y/%m/%d");

    const parsedData = lineChartData.map((company) => ({
        ticker: company.ticker,
        values: company.values.map((val) => ({
            close: val.close,
            date: parseTime(val.date),
        })),
    }));

    const xScale = d3
        .scaleTime()
        .domain([
            d3.min(parsedData, (d) => d3.min(d.values, (v) => v.date)),
            d3.max(parsedData, (d) => d3.max(d.values, (v) => v.date)),
        ])
        .range([0, width]);

    const yScale = d3
        .scaleLinear()
        .domain([
            d3.min(parsedData, (d) => d3.min(d.values, (v) => v.close)),
            d3.max(parsedData, (d) => d3.max(d.values, (v) => v.close)),
        ])
        .range([height, 0]);

    const line = d3
        .line()
        .x((d) => xScale(d.date))
        .y((d) => yScale(d.close))
        .curve(d3.curveCatmullRom.alpha(0.5));

    svg.selectAll(".line")
        .data(parsedData)
        .enter()
        .append("path")
        .attr("d", (d) => {
            const lineValues = line(d.values).slice(1);
            const splitedValues = lineValues.split(",");

            return `M0,${height},${lineValues},l0,${
                height - splitedValues[splitedValues.length - 1]
            }`;
        })
        .style("fill", "url(#gradient)");

    svg.selectAll(".line")
        .data(parsedData)
        .enter()
        .append("path")
        .attr("d", (d) => line(d.values))
        .attr("stroke-width", "2")
        .style("fill", "none")
        .style("filter", "url(#glow)")
        .attr("stroke", "#47D3DE");

    function setFade(selection, opacity) {
        selection.style("opacity", opacity);
    }

    const tick = svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).ticks(12))
        .selectAll(".tick")
        .style("transition", ".2s");

    tick.selectAll("line")
        .attr("stroke-dasharray", `5, 5`)
        .attr("stroke", "#ccc")
        .attr("y2", `-${height}px`);

    tick.append("rect")
        .attr("width", `${width / 12 + 10}px`)
        .attr("x", `-${width / 24 + 5}px`)
        .attr("y", `-${height}px`)
        .attr("height", `${height + 30}px`)
        .style("cursor", "pointer")
        .style("fill", "transparent");

    tick.on("mouseout", function (data, index, elements) {
        d3.selectAll(elements).call(setFade, 1);
    }).on("mouseover", function (data, index, elements) {
        d3.selectAll(elements).filter(":not(:hover)").call(setFade, 0.2);
    });

    svg.select(".domain").attr("stroke", "#ddd");
}

function makeBarChart() {
    const data = [
        {
            detector: "Social Security",
            violations: 50,
        },
        {
            detector: "US Driving Liscense",
            violations: 30,
        },
        {
            detector: "Date of Birth",
            violations: 60,
        },
    ];

    const margin = 60;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    const svg = d3.select("#bar-chart");

    const chart = svg
        .append("g")
        .attr("transform", `translate(${margin}, ${margin})`);

    const yScale = d3.scaleLinear().range([height, 0]).domain([0, 100]);

    chart.append("g").call(d3.axisLeft(yScale));

    const xScale = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map((s) => s.detector))
        .padding(0.2);

    chart
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    // draw column bar
    chart
        .selectAll()
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (s) => xScale(s.detector))
        .attr("y", (s) => yScale(s.violations))
        .attr("height", (s) => height - yScale(s.violations))
        .attr("width", xScale.bandwidth());

    chart
        .append("g")
        .attr("class", "grid")
        .call(
            d3.axisLeft().scale(yScale).tickSize(-width, 0, 0).tickFormat("")
        );
}

function makePieChart() {
    var data = [44, 55, 13, 24];

    var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal().range(['#5E15D4', '#1A105A', '#885BD0', '#AE95D7']);

    var arc = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3
        .arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3
        .pie()
        .sort(null)
        .value(function (d) {
            return d;
        });

    var svg = d3
        .select("#pie-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg
        .selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
            return color(d.data);
        });

    g.append("text")
        .attr("transform", function (d) {
            return "translate(" + labelArc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .text(function (d) {
            return d.data;
        });
}

const D3 = () => {
    useEffect(() => {
        makeAreaChart();
        makeBarChart();
        makePieChart();
    });

    return (
        <Wrapper>
            <div id="line-chart"></div>
            <svg id="bar-chart" height={700} width={1300} />
            <div id="pie-chart"></div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100vh;
`;

export default D3;
