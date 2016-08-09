var React = require("react")
var {Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter} = require("react-bootstrap")
var {LoadingButton, Bootstrap: {FormGroup}} = require("../../components")
var {Api, Dialog} = require("../../services")
var {reduxForm} = require("redux-form")

const validate = values=>{
    const errors = {};
    if(!values.keyword){
        errors.keyword = "请输入名称"
    }

    return errors;
}

class ModifyTagForm extends React.Component{
    render(){
        const {fields: {keyword, id}, handleSubmit} = this.props

        return (
            <form noValidate onSubmit={handleSubmit}>
                <FormGroup validation={keyword}>
                    <input type="text" className="form-control" {...keyword} />
                </FormGroup>
                <input type="hidden" {...id}/>
            </form>
        )
    }
}

ModifyTagForm = reduxForm({
    form: "modifyTagForm",
    fields: ["keyword", "id"],
    validate
})(ModifyTagForm)

class ModifyTag extends React.Component{
    constructor(){
        super()

        this.state = {
            show: false,
            loading: false,
            tag: {
                keyword: ""
            }
        }
    }

    show(tag){
        this.setState({
            show: true,
            tag: tag
        })
    }

    hide(){
        this.setState({
            show: false
        })
    }

    onSubmit(model){
        if(this.state.loading){
            return;
        }

        this.setState({
            loading: true
        }, ()=>{
            Api.editTag(model.id, model.keyword, response=>{
                this.setState({
                    loading: false
                })
                if(response.success){
                    Dialog.success("操作成功")
                    if(this.props.onSuccess){
                        this.props.onSuccess()
                    }
                    this.hide()
                }
                else{
                    Dialog.error(response.errorMessage)
                }
            })
        })
    }

    submit(){
        this.refs.form.submit()
    }
    
    render(){
        return (
            <Modal show={this.state.show}>
                <ModalHeader>
                    <ModalTitle>编辑标签</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <ModifyTagForm ref="form" onSubmit={this.onSubmit.bind(this)} initialValues={this.state.tag}></ModifyTagForm>                        
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-default pull-left" onClick={this.hide.bind(this)}>取消</button>
                    <LoadingButton loading={this.state.loading} className="btn btn-primary" onClick={this.submit.bind(this)}>保存</LoadingButton>
                </ModalFooter>
            </Modal>
        )
    }
}

ModifyTag.propTypes = {
    onSuccess: React.PropTypes.func
}

module.exports = ModifyTag