import React from "react";
import PropTypes from "prop-types";
import "./SimpleReactFooter.css";
import {ImFacebook2} from "react-icons/im";
import {FaTwitterSquare} from "react-icons/fa"
import {ImInstagram} from "react-icons/im";
import {ImLinkedin} from "react-icons/im";
import {ImYoutube} from "react-icons/im";
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

class SimpleReactFooter extends React.Component {
    
	render() {
		return (
            <div style={{ backgroundColor: this.props.backgroundColor || "bisque" }} className="footer-container">

                <div className="first-row">
                    <div className="col-about">
                            <div style={{ color: this.props.fontColor || "black" }} className="first-title">{this.props.title}</div> 
                            <div style={{ color: this.props.fontColor || "black" }} className="description">{this.props.description}</div>
                    </div>
                    {this.props.columns.map(column => (
                        <div className="columns">
                            <div style={{ color: this.props.fontColor || "black" }} className="second-title">{column.title}</div>
                            {column.resources.map(resource => (
                                <div key={resource.id}>
                                    <Link to={resource.link} style={{ color: this.props.fontColor || "black" }} className="resources">{resource.name}</Link>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {this.props.facebook !== undefined && this.props.linkedin !== undefined && this.props.instagram !== undefined && this.props.twitter !== undefined && this.props.pinterest !== undefined && this.props.youtube !== undefined ?
                <div className="social-media-col">
                    <div style={{ color: this.props.fontColor || "black" }} className="stay-connected-title"><FormattedMessage id="stay-connected" /></div>
                    <div className="social-media">
                        {this.props.facebook !== undefined ? <a href={`https://www.facebook.com/${this.props.facebook}`} target="_blank" rel="noreferrer" className="socialMediaLogo"><ImFacebook2 color={`${this.props.iconColor || "black" }`} size={25}/> </a> : ""}
                        {this.props.twitter !== undefined ? <a href={`https://www.twitter.com/${this.props.twitter}`} rel="noreferrer"  target="_blank" className="socialMediaLogo"><FaTwitterSquare color={`${this.props.iconColor || "black" }`} size={25}/> </a> : ""}
                        {this.props.instagram !== undefined ? <a href={`https://www.instagram.com/${this.props.instagram}`} rel="noreferrer"  target="_blank" className="socialMediaLogo"><ImInstagram color={`${this.props.iconColor || "black" }`} size={25}/> </a> : ""}
                        {this.props.linkedin !== undefined ? <a href={`https://www.linkedin.com/${this.props.linkedin}`} rel="noreferrer"  target="_blank" className="socialMediaLogo"><ImLinkedin color={`${this.props.iconColor || "black" }`} size={25}/> </a> : ""}
                        {this.props.youtube !== undefined ? <a href={`https://www.youtube.com/channel/${this.props.youtube}`} rel="noreferrer"  target="_blank" className="socialMediaLogo"><ImYoutube color={`${this.props.iconColor || "black" }`} size={25}/> </a> : ""}
                    </div>
                </div> : ""}

                <div>
                    <div style={{ color: this.props.copyrightColor || "grey" }} className="copyright">Copyright &copy; {this.props.copyright}</div>
                </div>
            </div>
        )
	}
}

SimpleReactFooter.propTypes = {
    description: PropTypes.string,
    linkedin: PropTypes.string,
    instagram: PropTypes.string,
    facebook: PropTypes.string,
    youtube: PropTypes.string,
    title: PropTypes.string,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            resources: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                    link: PropTypes.string
                })
            )
        })
    ),
    copyright: PropTypes.string,
    iconColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontColor: PropTypes.string,
    copyrightColor: PropTypes.string
};

export default SimpleReactFooter;