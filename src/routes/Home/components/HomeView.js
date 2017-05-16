import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'
import {Table, DatePicker, Button, Card, Menu, Dropdown, Icon, Breadcrumb} from 'antd'
import {translate} from 'react-i18next';
import  template  from '../../../template-web'
// import  tmpl  from '../../../tmpl.min'

export const HomeView = ({t, changeLanguage}) => (
  <div>
    <Breadcrumb style={{margin: '12px 0'}}>
      <Breadcrumb.Item>财务管理</Breadcrumb.Item>
      <Breadcrumb.Item>业务处理</Breadcrumb.Item>
      <Breadcrumb.Item>填制凭证</Breadcrumb.Item>
    </Breadcrumb>
    <Card>
      <h4>Welcome!</h4>
      {t("appName")}
      {/*<img
       alt='This is a duck, because Redux!'
       className={classes.duck}
       src={DuckImage} />*/}
      <DatePicker />
      <Button type="primary">dfdfdf</Button>

      <input type="button" onClick={() => changeLanguage('en')} value="ToEn"></input>
      <input type="button" onClick={() => changeLanguage('zh')} value="ToZh"></input>

      <div className="content"
           dangerouslySetInnerHTML={{__html: "dsdf{t}fds<h2>333</h2><script type='text/javascript'>alert('sds')</script>"}}></div>
      {/*{template.render("<h2>{{data}}errerere</h2>", {data: "ddc"})}*/}



    </Card>
  </div>
)

export default translate()(HomeView)
