import React from 'react';
import Highcharts from 'highcharts';
import {Highcharts as Hs} from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official';
type Props = {
	title: string;
	subtitle: string;
	color: string;
	maleData:number[];
	femaleData:number[];
	province:string[];
};
type Props2 = {
	title: string;
	subtitle: string;
	data:any[];
};

const Chart = (props: Props) => {
	const options = {
		credits: {
			text: 'EDataBank'
		},
		chart: {
			 type: 'column'
			//type: 'spline'
		},
		title: {
			text: props.title
		},
		subtitle: {
			text:props.subtitle
		},
		xAxis: {
			categories:props.province,
			accessibility: {
				description: 'Provinces'
			}
		},
		yAxis: {
			accessibility: {
				description: 'Total Range'
			}
		},
		tooltip: {
			crosshairs: true,
			shared: true
		},
		series:  [
			{
				 data:props.maleData,
				color:"#D92525",
				name: 'Male'
			},
			{
				 data:props.femaleData,
				color:"#1a4b78",
				name: 'Female'
			}
		]
	};
	return (
		<div className="ms-Grid" dir="ltr">
			<div className="ms-Grid-row">
				<div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
					<HighchartsReact highcharts={Highcharts} options={options} />
				</div>
			</div>
		</div>
	);
};
export const Chart2 = (props: Props2) => {

	const options = {
		credits: {
			text: 'EDataBank'
		},
		
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text:props.title,
				align: 'center'
			},
			subtitle: {
				text:props.subtitle
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			accessibility: {
				point: {
					valueSuffix: '%'
				}
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true
					},
					showInLegend: false
				}
			},
			series: [{
				name: 'Province',
				colorByPoint: true,
				data:props.data
			}]
		
	
	};
	return (
		<div className="ms-Grid" dir="ltr">
			<div className="ms-Grid-row">
				<div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
					<HighchartsReact highcharts={Highcharts} options={options} />
				</div>
			</div>
		</div>
	);
};

export default Chart;
