import { ConfigProvider, DatePicker, Space } from "antd";
import "antd/dist/antd.css";
import locale from 'antd/lib/locale/zh_TW';
import { React } from "react";
import { useSelector } from "react-redux";
const { RangePicker } = DatePicker;
function DateRange(props) {
  const l = useSelector(state => state.locale.locale)

  return (
    <>
      {l === "en" ?
        <Space direction="vertical" size={12}>
          <RangePicker
            value={props.value}
            onChange={props.DateChange}
            format="YYYY-MM-DD"
          />
        </Space> :
        <ConfigProvider locale={locale}>
          <Space direction="vertical" size={12}>
            <RangePicker
              value={props.value}
              onChange={props.DateChange}
              format="YYYY-MM-DD"
            />
          </Space>
        </ConfigProvider>
      }
    </>
  )
}

export default DateRange;