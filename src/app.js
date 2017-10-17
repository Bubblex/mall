import dva from 'dva'
import { browserHistory } from 'dva/router'

import './app.less'

const app = dva({
    history: browserHistory,
})

app.use({})

app.model(require('./models/wechat'))
app.model(require('./models/user'))
app.model(require('./models/menu'))
app.model(require('./models/bill'))
app.model(require('./models/order'))
app.model(require('./models/common'))
app.model(require('./models/ticket'))
app.model(require('./models/activity'))
app.model(require('./models/operator'))
app.model(require('./models/products'))
app.model(require('./models/shopping-cart'))

app.router(require('./router'))

app.start('#root')
