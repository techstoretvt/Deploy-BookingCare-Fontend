import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';


class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về TRẦN VĂN THOẠI
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        {/* <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                            title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe> */}
                        <iframe width="100%" height="400" src="https://www.youtube.com/embed/bMQ9hkWnzQ0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate nobis cupiditate non voluptatibus modi, dolores dolorum reprehenderit repellat sunt. Officiis vero officia sit iusto sed, saepe nam explicabo eveniet.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate nobis cupiditate non voluptatibus modi, dolores dolorum reprehenderit repellat sunt. Officiis vero officia sit iusto sed, saepe nam explicabo eveniet.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate nobis cupiditate non voluptatibus modi, dolores dolorum reprehenderit repellat sunt. Officiis vero officia sit iusto sed, saepe nam explicabo eveniet.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate nobis cupiditate non voluptatibus modi, dolores dolorum reprehenderit repellat sunt. Officiis vero officia sit iusto sed, saepe nam explicabo eveniet.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
