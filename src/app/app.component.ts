import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { ColDef, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) { }
  private gridApi!: GridApi;

  title = 'ag-grid-demo';
  userList: any[] = [];
  public rowSelection: "single" | "multiple" = "multiple";

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data: any) => {
      this.userList = data;
      console.log(this.userList);
    });
  }
  // we also can use "flex: 1" to make the grid fill the container
  //  headerName is displayed in the header of the column
  //  field is the key in the userlistarray that the column should display
  columnDefs: ColDef[] = [
    {
      headerName: 'Emp ID', field: 'id',
      cellRenderer: (params: any) => {
        // console.log(params);
        return `EMP-${params.value}`;
      },
      filter: "agNumberColumnFilter",
      editable: true,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      // width:50,
      cellStyle: { fontWeight: 'bold', color: 'blue' },

    },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Username', field: 'username' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Website', field: 'website' },
    { headerName: 'Phone', field: 'phone' }
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true
  };

  onGridReady(params: any) {
    console.log(params);
    this.gridApi = params.api;
  }

  onBtnExport() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.gridApi.exportDataAsCsv(
      {onlySelected: true,fileName: 'User_Data.csv',}
    );
  }
}
