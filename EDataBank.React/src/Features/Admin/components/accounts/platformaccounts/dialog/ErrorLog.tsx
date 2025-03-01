import React, { useContext, useRef } from 'react';
import { Empty, List } from 'antd';
import { Observer, observer } from 'mobx-react-lite';
import { MessageBar, MessageBarType } from '@fluentui/react';

import { AgGridReact } from 'ag-grid-react';
import adminStore from '../../../../store/adminstore';
import { toJS } from 'mobx';
import { HTMLComponent } from 'react-typescript-raw-html';

const ErrorLog = observer(() => {
	const customProductgrid = useRef<AgGridReact>(null);

	const gridcolumnDefs = {
		columnDefs: [
			{
				rowDrag: true,
				valueGetter: function(params: any) {
					return Number(params.node.id) + 1;
				},
				//width: 80,
				sortable: true,
				resizable: true,
				checkboxSelection: true
			},

			{
				headerName: 'Data Validation Error Group',

				field: 'group',
				sortable: true,
				resizable: true,
				filter: true,
				rowGroup: true,
				editable: true
			},
			{
				headerName: 'Message',
				field: 'message',
				sortable: true,
				resizable: true,
				filter: true,
				width: 900,
				editable: true,
				cellRendererFramework: function(props: any) {
					const { message } = props.data;
					return <HTMLComponent rawHTML={message} />;
				}
			}
		]
	};
	return (
		<div className="ms-Grid-row">
			<div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
				<div
					className="ag-theme-balham"
					style={{
						minHeight: '50vh',
						height: '60vh',
						width: '100%',
						maxHeight: '80vh'
					}}
				>
					{adminStore.errorModels.size === 0 ? (
						<Empty description={`No Member Data upload errors,everything looks great.`} />
					) : (
						<>
						 <MessageBar messageBarType={MessageBarType.warning} > <b>Right-click the table to select your export option</b> </MessageBar>
						 <AgGridReact
							rowData={[ ...adminStore.errorModels.values() ].map((row) => toJS(row))}
							ref={customProductgrid}
							gridOptions={{
								defaultColDef: {
									sortable: true,
									filter: true
								},
								rowHeight: 30,
								rowSelection: 'multiple',
								pagination: false,
								groupDisplayType: 'groupRows',
								groupSelectsChildren: true,

								columnDefs: gridcolumnDefs.columnDefs,
								animateRows: true,
								singleClickEdit: true,
								statusBar: {
									statusPanels: [
										{
											statusPanel: 'agTotalRowCountComponent',
											align: 'center'
										}
									]
								}
							}}
							rowSelection="single"
							copyHeadersToClipboard={true}
							overlayLoadingTemplate={`${(
								<span className="ag-overlay-loading-center">
									Please wait while your rows are loading
								</span>
							)}`}
						/>
						</>
						
					)}
				</div>
			</div>
		</div>
	);
});

export default ErrorLog;
