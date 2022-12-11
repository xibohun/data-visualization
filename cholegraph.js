
async function run(){


        const eduResp = fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json")

        const educations = await eduResp.json()


        const countiesResp =  fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json")

        const counties = await countiesResp.json()

        const width = 800
        const height = 400
        const padding = 80

        const path = d3.geoPath()


        const data =topjson.feature(counties, counties.objects.counties).feature.slice(0,10);
        const minEdu = d3.min(educations, edu => edu.bachelorOrHigher)
        const maxEdu = d3.max(educations, edu=> edu.bachelorOrHigher)

        const step = (maxEdu - minEdu) / 12;

        const colorScale = d3.scaleThreshold()
            .domain(d3.range([minEdu, maxEdu, (maxEdu-minEdu) /9]))
        
            
            .range(schemePurples[4])
        colors = []

        for (let i = minEdu; i <= maxEdu; i+=step ){
            colors.push(colorScale(i))
        }

        const colors = [minEdu, maxEdu].map(edu =>colorScale(edu))


        const svg = d3.select("#container")
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)

                    svg.append('g')
                        .selectAll(path)
                        .data(data)
                        .enter()
                        .append(path)
                        .attr('d', path)
                        .attr('fill', black)
                        .attr('class', county)
                        .attr('data-flips', d => d.id)
                        .attr('data-education', (d,i) =>{
                            const education = education.find(edu => edu.flips === d.id).bachelorsOrHigher
                        })
                            
                        
                        .on('mouseover', (d, i) =>{
                            const {coordinates} = d.geometry
                            const [x][y] = coordinates[0][0]
                            const education = educations.find(edu => edu.fips === d.id)

                            tooltip.classList.add('show')
                            tooltip.style.left = x + 'px'
                            tooltip.styl.top = y + 'px'
                            tooltip.setAttribute('data-education', education.bachelorsOrHeigher)

                            tooltip.innerHTML = `
                                <p> ${education.areaname} - ${education.state}</p>
                                <p> ${education.bachelorsOrHigher} </p>
                            
                            `
                        }).on(
                            'mouseout', () =>{
                                tooltip.classList.remove('show')
                        });

                        const legendWidth = 200
                        const legendHeight = 50
                        const legendRectWidth = legendWidth/ colors.length
                        const legend = d3.select("body")
                        .append('svg')
                        .attr('id', 'lengend')
                        .attr('width', legendWidth)
                        .attr('height', legendHeight)
                        .selectAll('rect')
                        .data(colors)
                        .enter()
                        .append('rect')
                        .attr('x', (_, i) => i * legendRectWidth)
                        .attr('y', 0)
                        .attr('width', lengendRectWidth)
                        .attr('height', legendHeight)
                        .attr('fill', c => c)

                        legend.selectAll('text')
                            .data(colors)
                            .enter()
                            .data('fill', black)
                            .attr('x', (_, i) => i * legendRectWidth)
                            .attr('y', 0)
                            .text(c => c)














}

run();



