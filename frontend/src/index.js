import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, createTheme, Grid} from "@material-ui/core";

class Todo extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:this.props.id,
            columnid:this.props.columnid,
            name:this.props.name,
            description:this.props.description,
            open:false,
            namemodifyvalue:this.props.name,
            descriptionmodifyvalue:this.props.description

        }

    }
    closeModify(){
        let namemod=this.state.namemodifyvalue
        let desmod=this.state.descriptionmodifyvalue
        this.setState({
            open:false,
            name:namemod,
            description:desmod
        })

        const item={
            id:this.state.id,
            columnID:this.state.columnid,
            name:this.state.namemodifyvalue,
            description:this.state.descriptionmodifyvalue,
        //    position:1,
        //    column:null
        }
        this.fetchmodify(item)

    }

    fetchmodify(item){
        fetch('/api/todoitems/'+[this.state.id], {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(item)
        }).catch(error => console.error('Unable to add item.', error))
    }

    render() {
        return(
            <div className="margin">
                <Card sx={{maxWidth:300}}>
                    <CardContent>
                        <Typography>
                            Név:{this.state.name}
                        </Typography>
                        <Typography>
                            Leírás:{this.state.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button startIcon={<ArrowUpwardIcon/>} onClick={()=>this.props.updataline(this.state.id)}/>
                        <Button startIcon={<ArrowDownwardIcon/>} onClick={()=>this.props.downdataline(this.state.id)} />
                        <Button startIcon={<DeleteIcon/>} onClick={()=>this.props.emptydataline(this.state.id)}/>
                        <Button sx={{width:300}} startIcon={<AddCircleIcon/>} onClick={()=>this.setState({open:true})}/>
                        <Dialog open={this.state.open} alignItems="center">
                            <DialogTitle>Modify a Task</DialogTitle>
                            <DialogContentText >To modify a Task please edit the fields below</DialogContentText>
                            <DialogContent>
                                <form onSubmit={()=>this.closeModify()}>
                                    <label>
                                        Task:
                                        <TextField type="text" value={this.state.namemodifyvalue} onChange={(e)=>this.setState({namemodifyvalue: e.target.value})} />
                                        Description:
                                        <TextField type="text" value={this.state.descriptionmodifyvalue} onChange={(e)=>this.setState({descriptionmodifyvalue: e.target.value})} />
                                    </label>
                                    <div> <Button onClick={()=>this.setState({open:false})}>Cancel</Button>
                                        <Button type="submit" variant="text" value="Submit">Modify</Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardActions>
                </Card>
            </div>
        )
    }
}



class ProjectBox extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            todos:Array().fill(''),
            id:this.props.value,
            datalines:Array().fill(''),
            datas:Array().fill(''),
            ids:Array().fill(''),
            opens:Array().fill(false),
            test:'testname',
            value:'',
            value2:'',
            valuemodify:'aaaaa',
            value2modify:'bbbbb',
            count:0,
            open:false,
            modifydx:0,
            init:false,
            max:false,
            maxid:0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitmodify = this.handleSubmitmodify.bind(this);
    }

    handleClickOpenmodify(dx){
        let boolarray=this.state.opens
        boolarray[dx]=true
        let array1=this.state.datalines
        let array2=this.state.datas
        this.setState({opens:boolarray,
        valuemodify:array1[dx],
            value2modify:array2[dx],
            modifydx:dx
        })
    }
    handleClosemodify(dx){
        let boolarray=this.state.opens
        boolarray[dx]=false
        this.setState({opens:boolarray})
    }


    initlines(){
        if(this.state.init===false) {
            this.setState({init:true})
            const uri = '/api/todoitems';
            fetch(uri)
                .then(response => response.json())
                .then(data => this.adddatalines(data))
                .catch(error => console.error('Unable to get items.', error));
        }
    }
    adddatalines(data){
        var k=0
        let todolist=[]
        let cnt=this.state.count
        for(k=0;k<data.length;k++){
            if(data[k].columnID===this.state.id){
                console.log(data[k].name)
                todolist.push(<Todo name={data[k].name}
                                    description={data[k].description}
                                    id={data[k].id}
                                    columnid={data[k].columnID}
                                 downdataline={(i)=>this.downdataline(i)}
                                 updataline={(i)=>this.updataline(i)}
                                 emptydataline={(i)=>this.emptydataline(i)}

                />)
                cnt++
                }
            }
        this.setState({todos:todolist,count:cnt})

        }

    getmaxid(){
      /*  if(this.state.max===false) {
            const uri = '/api/todoitems';
            fetch(uri)
                .then(response => response.json())
                .then(data => this.maxid(data))
                .catch(error => console.error('Unable to get items.', error));
        }


       */
        if(this.state.max===false){
            const uri = '/api/todoitems';
            fetch(uri)
                .then(response => response.json())
                .then(data => this.maxid(data))
                .catch(error => console.error('Unable to get items.', error));
        }

        setTimeout(() => {  const uri = '/api/todoitems';
            fetch(uri)
                .then(response => response.json())
                .then(data => this.maxid(data))
                .catch(error => console.error('Unable to get items.', error)); }, 5000);
    }
    maxid(data){
        var dx=0;
        for(var k=0;k<data.length;k++){
            dx=data[k].id
        }
        this.setState({
            maxid:dx,
            max:true
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let newarray=this.state.datalines
        let newarray2=this.state.datas
        let newarray3=this.state.ids
        let prevcount=this.state.count
        newarray[this.state.count]=this.state.value
        newarray2[this.state.count]=this.state.value2
        newarray3[this.state.count]=this.state.maxid+1
        let todoslist=this.state.todos
        todoslist.push(<Todo name={this.state.value}
                            description={this.state.value2}
                            id={this.state.maxid+1}
                             columnid={this.state.id}
                            downdataline={(i)=>this.downdataline(i)}
                            updataline={(i)=>this.updataline(i)}
                            emptydataline={(i)=>this.emptydataline(i)}
        />)
        const item={
            id:this.state.maxid+1,
            columnID:this.state.id,
            name:this.state.value,
            description:this.state.value2,
          //  position:1,
         //   column:null
        }
        fetch('api/todoitems', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
            })
            .then(response => response.json())
            .catch(error => console.error('Unable to add item.', error))
        this.setState({
            count:prevcount+1,
            datalines:newarray,
            datas:newarray2,
            ids:newarray3,
            value:'',
            value2:'',
            open:false,
            max:false,
            todos:todoslist
        })



    }


    handleSubmitmodify(event) {
        //this.setState({output: this.state.value })
        event.preventDefault();
        let newarray=this.state.datalines
        let newarray2=this.state.datas
        let dx=this.state.modifydx
        newarray[dx]=this.state.valuemodify
        newarray2[dx]=this.state.value2modify
        let id=this.state.ids[dx]

        const item={

        }
        fetch('/api/todoitems/'+[id], {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                    id:id,
                    columnID:this.state.id,
                    name:this.state.valuemodify,
                    description:this.state.value2modify,
                 //   position:1,
                //    column:null
            })
        }).catch(error => console.error('Unable to add item.', error))
        /*    .then(()=>this.setState({
            datalines:newarray,
            datas:newarray2,
            valuemodify:'',
        }))*/


        this.handleClosemodify(dx)
    }

    emptydataline(i){

        fetch("/api/todoitems/"+i, {
            method: 'DELETE'
        })
            .catch(error => console.error('Unable to delete item.', error));
        setTimeout(() => { this.setState({todos:Array().fill(''),init:false})},500)
    }
    updataline(k){
        let i=0
        const uri = '/api/todoitems';
        fetch(uri)
            .then(response => response.json())
            .then(data => this.toMoveUP(data,k))
            .catch(error => console.error('Unable to get items.', error));
    }
    toMoveUP(data,k){
        let dx
        let datalist=[]
        for(let d=0;d<data.length;d++){
            if(data[d].columnID===this.state.id){
                datalist.push(data[d])
            }
        }
        for(let i=0;i<datalist.length;i++){
            if(datalist[i].id===k){
                dx=i
            }
        }
        if(dx===0)
            return

        const itemfelso={
            id:datalist[dx].id,
            columnID:this.state.id,
            name:datalist[dx-1].name,
            description:datalist[dx-1].description,
         //   position:1,
         //   column:null
        }

        const itemalso={
            id:datalist[dx-1].id,
            columnID:this.state.id,
            name:datalist[dx].name,
            description:datalist[dx].description,
         //   position:1,
         //   column:null
        }
        this.fetchback(itemfelso.id,itemfelso,itemalso.id,itemalso)

        setTimeout(() => { this.setState({todos:Array().fill(''),init:false})},500)
    }

    downdataline(k){
        let i=0
        const uri = '/api/todoitems';
        fetch(uri)
            .then(response => response.json())
            .then(data => this.toMoveDOWN(data,k))
            .catch(error => console.error('Unable to get items.', error));
    }

    toMoveDOWN(data,k){
        let dx
        let datalist=[]
        for(let d=0;d<data.length;d++){
            if(data[d].columnID===this.state.id){
                datalist.push(data[d])
            }
        }
        for(let i=0;i<datalist.length;i++){
            if(datalist[i].id===k){
                dx=i
            }
        }
        if(dx===datalist.length)
            return

        const itemfelso={
            id:datalist[dx].id,
            columnID:this.state.id,
            name:datalist[dx+1].name,
            description:datalist[dx+1].description,
         //   position:1,
         //   column:null
        }

        const itemalso={
            id:datalist[dx+1].id,
            columnID:this.state.id,
            name:datalist[dx].name,
            description:datalist[dx].description,
          //  position:1,
          //  column:null
        }
        this.fetchback(itemfelso.id,itemfelso,itemalso.id,itemalso)

        setTimeout(() => { this.setState({todos:Array().fill(''),init:false})},500)
    }

    //direction 0 downdata, 1 updata
    /*
    toMove(data,k,direction){
        let dx
        let datalist=[]
        for(let d=0;d<data.length;d++){
            datalist.push(data[d])
        }
        for(let i=0;i<datalist.length;i++){
            if(datalist[i].id===k){
                dx=i
            }
        }
        const itemfelso={
            id:datalist[dx].id,
            columnID:this.state.id,
            name:datalist[dx-1].name,
            description:datalist[dx-1].description,
            position:1,
            column:null
        }
        const itemfofel={
            id:datalist[dx-1].id,
            columnID:this.state.id,
            name:datalist[dx].name,
            description:datalist[dx].description,
            position:1,
            column:null
        }
        const itemfo={
            id:datalist[dx+1].id,
            columnID:this.state.id,
            name:datalist[dx].name,
            description:datalist[dx].description,
            position:1,
            column:null
        }
        const itemalso={
            id:datalist[dx].id,
            columnID:this.state.id,
            name:datalist[dx+1].name,
            description:datalist[dx+1].description,
            position:1,
            column:null
        }
        if(direction==2){
            this.fetchback(itemfo.id,itemfo,itemalso.id,itemalso)
        }
        if(direction==1){
            this.fetchback(itemfofel.id,itemfofel,itemfelso.id,itemfelso)
        }
        this.setState({todos:Array().fill(''),init:false})
    }
    */

    fetchback(i,item,i2,item2){
        fetch("/api/todoitems/"+i, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).catch(error => console.error('Unable to add item.', error))
        fetch("/api/todoitems/"+i2, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item2)
        }).catch(error => console.error('Unable to add item.', error))
    }


    renderdatalines(){
        let renderlines=[]
        if(this.state.init===false)
            return
        for(let k=0;k<10;k++){
            renderlines.push(this.state.todos[k])
        }
        return renderlines
    }
    render() {

        return (
            <Box>
                {this.initlines()}
                {this.getmaxid()}
                <Button sx={{width:300}} startIcon={<AddCircleIcon/>} onClick={()=>this.setState({open:true})}/>
                <Dialog open={this.state.open} alignItems="center">
                    <DialogTitle>Add a Task</DialogTitle>
                    <DialogContentText >To add a new Task please fill the fields below</DialogContentText>
                    <DialogContent>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Task:
                            <TextField required type="text" value={this.state.value} onChange={(e)=>this.setState({value: e.target.value})} />
                            Description:
                            <TextField type="text" value={this.state.value2} onChange={(e)=>this.setState({value2: e.target.value})} />
                        </label>
                        <div> <Button onClick={()=>this.setState({open:false})}>Cancel</Button><Button type="submit" variant="text" value="Submit">Add</Button></div>
                    </form>
                    </DialogContent>
                </Dialog>
                {this.renderdatalines()}
            </Box>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            numberOfprojects:0,
            projectArray:Array(3).fill(''),
            maxprojectsnumber:10,
            init:false,
            maxid:0,
        }
    }

    fetchcolumn(i){
        const item={
            ID:i,
           // TodoItems:null,
        }
        fetch('api/columns', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .catch(error => console.error('Unable to add item.', error))
    }

    addProject(dx){
        let idx=this.state.maxid+1
        let projects= []
        for(let j=0;j<this.state.numberOfprojects;j++){
            projects.push(this.state.projectArray[j])
        }
        projects.push(
            <Grid item xs={12} md={3}>
                    <ProjectBox value={(idx)} />
            </Grid>

            )
        this.fetchcolumn(idx)
        this.setState({
            projectArray:projects,
            numberOfprojects:this.state.numberOfprojects+1,
            maxid:idx
        })
    }
    addProjectwithoutfetch(dx){
        let max=this.state.max
        let projects= []
        for(let j=0;j<this.state.numberOfprojects;j++){
            projects.push(this.state.projectArray[j])
        }
        projects.push(
            <Grid item xs={12} md={3}>
                <ProjectBox value={(dx)} />
            </Grid>

        )
        this.setState({
            projectArray:projects,
            numberOfprojects:this.state.numberOfprojects+1,
            maxid:dx
        })
    }
    clearProjects(){
        this.deletealltodos()
        this.setState({
            projectArray:Array(0),
        })
    }

    addlist(data){
            for (var k = 0; k < data.length; k++) {
                this.addProjectwithoutfetch(data[k].id);
            }
    }
    initcolumns(){
        if(this.state.init===false) {
            this.setState({init:true})
            const uri = '/api/columns';
                fetch(uri)
                    .then(response => response.json())
                    .then(data => this.addlist(data))
                    .catch(error => console.error('Unable to get items.', error));
        }
    }

    maxid(data){
        let dx=0;
        for(let k=0;k<data.length;k++){
            dx=data[k].id
        }
        this.setState({
            maxidtodo:dx,
        })
        for(let l=1;l<=dx;l++){
            this.deletetodo(l)
        }
        for(let h=1;h<=this.state.maxid;h++){
            this.deletecolumns(h)
        }
        this.setState({numberOfprojects:0})
    }

    deletecolumns(h){
        fetch("/api/columns/"+h, {
            method: 'DELETE'
        })
            .catch(error => console.error('Unable to delete item.', error));
    }
    deletetodo(id){
        fetch("/api/todoitems/"+id, {
            method: 'DELETE'
        })
            .catch(error => console.error('Unable to delete item.', error));
    }
    deletealltodos(){
        const uri = '/api/todoitems';
        fetch(uri)
            .then(response => response.json())
            .then(data => this.maxid(data))
            .catch(error => console.error('Unable to get items.', error));
    }


    render() {
        return (
            <div >
                <Box >
                    <Grid container spacing={2}>
                        {this.initcolumns()}
                        {this.state.projectArray}
                        <Grid item xs={12} md={3}>
                            <Button variant="text" onClick={()=>this.addProject(this.state.max)}> Add Project</Button>
                            <Button variant="text" onClick={()=>this.clearProjects()}> Clear Projects</Button>
                        </Grid>
                    </Grid>
                </Box>


            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

