import parse from 'html-react-parser'
import { Table } from 'react-bootstrap'
const ShowHtml = ({ htmlText }) => {

    const changeHtmlData = () => {
        return parse(htmlText, {
            replace: node => {
                // change 
                if (node.name === 'table') {

                    node.attribs.class += ' table table-bordered table-hover table-striped'
                    return node


                }
                return node
            }
        })
    }

    return (
        <div>
            {changeHtmlData(htmlText)}
        </div>
    )
}

export default ShowHtml