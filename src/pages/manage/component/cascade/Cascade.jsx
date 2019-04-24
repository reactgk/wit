import React, { PureComponent } from 'react'
import { Select } from 'antd'
import httpClient from '../../../../network/httpClient'

const Option = Select.Option

class Cascade extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      province: '',
      totalProvinceList: [],
      provinceList: [],
      city: '',
      totalCityList: [],
      cityList: [],
      area: '',
      totalAreaList: [],
      areaList: [],
      street: '',
      totalStreetList: [],
      streetList: [],
      community: '',
      totalCommunityList: [],
      communityList: []
    }
  }

  componentDidMount () {
    this.getCascadeData()
  }

  /**
   * 获取联动数据
   */
  getCascadeData () {
    httpClient.get('meta/placeCascade').then(
      result => {
        const { data } = result
        let provinceList = data.province || []
        let totalProvinceList = data.province || []
        let province = (provinceList[0] || {}).departCode || ''
        let totalCityList = data.city || []
        let totalAreaList = data.area || []
        let totalStreetList = data.street || []
        let totalCommunityList = data.community || []
        const cityData = this.getCityData(province, totalCityList)
        const { city, cityList } = cityData
        const areaData = this.getAreaData(cityData.city, totalAreaList)
        const { area, areaList } = areaData
        const streetData = this.getStreetData(areaData.area, totalStreetList)
        const { street, streetList } = streetData
        const communityData = this.getCommunityData(streetData.street, totalCommunityList)
        const { community, communityList } = communityData
        this.props.onDataChange({ province, city, area, street, community })
        this.setState({
          province,
          provinceList,
          totalProvinceList,
          city,
          cityList,
          totalCityList,
          area,
          areaList,
          totalAreaList,
          street,
          streetList,
          totalStreetList,
          community,
          communityList,
          totalCommunityList
        })
      }
    ).catch((error) => {})
  }

  /**
   * 获取省对应的城市列表
   * @param value
   * @param totalCityList
   * @returns {{city: (*|string), cityList: Array}}
   */
  getCityData (value, totalCityList) {
    let cityList = []
    totalCityList.forEach((item) => {
      if (item.departPCode === value) {
        cityList.push(item)
      }
    })
    let city = (cityList[0] || {}).departCode || ''
    return { city, cityList }
  }

  /**
   * 获取城市对应的区列表
   * @param value
   * @param totalAreaList
   */
  getAreaData (value, totalAreaList) {
    let areaList = []
    totalAreaList.forEach((item) => {
      if (item.departPCode === value) {
        areaList.push(item)
      }
    })
    let area = (areaList[0] || {}).departCode || ''
    return { area, areaList }
  }

  /**
   * 获取区对应的街道列表
   * @param value
   * @param totalStreetList
   * @returns {{street: (*|string), streetList: Array}}
   */
  getStreetData (value, totalStreetList) {
    let streetList = [{
      id: -1,
      departCode: '',
      departName: '全部',
      departPCode: value
    }]
    totalStreetList.forEach((item) => {
      if (item.departPCode === value) {
        streetList.push(item)
      }
    })
    let street = (streetList[0] || {}).departCode || ''
    return { street, streetList }
  }

  /**
   * 获取街道对应的社区列表
   * @param value
   * @param totalCommunityList
   * @returns {{community: (*|string), communityList: Array}}
   */
  getCommunityData (value, totalCommunityList) {
    let communityList = [{
      id: -1,
      departCode: '',
      departName: '全部',
      departPCode: value
    }]
    totalCommunityList.forEach((item) => {
      if (item.departPCode === value) {
        communityList.push(item)
      }
    })
    let community = (communityList[0] || {}).departCode || ''
    return { community, communityList }
  }

  provinceChange (value) {
    const { totalCityList } = this.state
    const cityData = this.getCityData(value, totalCityList)
    this.setState({
      city: cityData.city,
      cityList: cityData.cityList
    })
  }

  cityChange (value) {
    const { totalAreaList } = this.state
    const areaData = this.getAreaData(value, totalAreaList)
    this.setState({
      area: areaData.area,
      areaList: areaData.areaList
    })
  }

  areaChange (value) {
    const { totalStreetList } = this.state
    const streetData = this.getStreetData(value, totalStreetList)
    this.setState({
      street: streetData.street,
      streetList: streetData.streetList
    })
  }

  streetChange (value) {
    const { totalCommunityList, province, city, area } = this.state
    const communityData = this.getCommunityData(value, totalCommunityList)
    const { community, communityList } = communityData
    this.props.onDataChange({ province, city, area, street: value, community })
    this.setState({
      street: value,
      community,
      communityList
    })
  }

  communityChange (value) {
    const { province, city, area, street } = this.state
    this.props.onDataChange({ province, city, area, street, community: value })
    this.setState({
      community: value
    })
  }
  render () {
    const {
      province, provinceList,
      city, cityList,
      area, areaList,
      street, streetList,
      community, communityList } = this.state
    return (
      <div>
        <Select
          value={province}
          style={{ width: 160 }}
          onChange={
            (value) => { this.provinceChange(value) }
          }>
          {
            provinceList.map(item =>
              <Option key={item.departCode} value={item.departCode}>{item.departName}</Option>
            )
          }
        </Select>
        <Select
          value={city}
          style={{ width: 150, marginLeft: 20, marginRight: 20 }}
          onChange={
            (value) => { this.cityChange(value) }
          }>
          {
            cityList.map(item =>
              <Option key={item.departCode} value={item.departCode}>{item.departName}</Option>
            )
          }
        </Select>
        <Select
          value={area}
          style={{ width: 150, marginRight: 20 }}
          onChange={
            (value) => { this.areaChange(value) }
          }>
          {
            areaList.map(item =>
              <Option key={item.departCode} value={item.departCode}>{item.departName}</Option>
            )
          }
        </Select>
        <Select
          value={street}
          style={{ width: 200, marginRight: 20 }}
          onChange={
            (value) => { this.streetChange(value) }
          }>
          {
            streetList.map(item =>
              <Option key={item.departCode} value={item.departCode}>{item.departName}</Option>
            )
          }
        </Select>
        <Select
          value={community}
          style={{ width: 200 }}
          onChange={(value) => { this.communityChange(value) }}>
          {
            communityList.map(item =>
              <Option key={item.departCode} value={item.departCode}>{item.departName}</Option>
            )
          }
        </Select>
      </div>
    )
  }
}

Cascade.defaultProps = {
  onDataChange: () => {}
}

export default Cascade
