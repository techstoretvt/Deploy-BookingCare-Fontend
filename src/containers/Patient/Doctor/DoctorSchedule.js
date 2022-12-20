import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import Select from 'react-select'
import moment, { lang } from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils'
import { getScheduleDoctorByDate } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);

        if (this.props.doctorIdFromParent) {
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }


        this.setState({
            allDays: allDays,
        })


    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let labelVi2 = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${labelVi2}`
                    object.label = today;
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = object.label.replace('th', 'Th').replace('ch', 'Ch')
                }

            }
            else {
                if (i === 0) {
                    let labelVi2 = moment(new Date()).format('DD/MM');
                    let today = `Today - ${labelVi2}`
                    object.label = today;
                }
                else
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object)
        }

        return allDays;
    }

    async componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.language !== this.props.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== preProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent != -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date)

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }


        }
    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
        console.log('check time click: ', time);
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state
        let { language } = this.props;

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calender'>
                            <i className="far fa-calendar-alt">
                                <span>
                                    <FormattedMessage id="patient.detail-doctor.schedule" />
                                </span>
                            </i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {
                                            allAvailableTime.map((item, index) => {
                                                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                return (
                                                    <button
                                                        key={index}
                                                        className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}
                                                        onClick={() => this.handleClickScheduleTime(item)}
                                                    >{timeDisplay}</button>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='book-free'>
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />
                                            <i className='far fa-hand-point-up'></i>
                                            <FormattedMessage id="patient.detail-doctor.book-free" />
                                        </span>
                                    </div>
                                </>
                                :
                                <div className='no-schedule'><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                            }

                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleTimeModal}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
