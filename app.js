var data = {
  updateCurrentQ: function () {
    this.current_question = data.questions.list.find(q => q.id === data.question_index);
  },
  selected: null,
  answers_total: 0,
  score: 0,
  current_question: null,
  question_index: null,
  questions: {
    list: [],
    fetch: function () {
      return m.request({
        method: "GET",
        url: "/questions"
      })
        .then(function (result) {
          data.questions.list = result.questions;
          data.question_index = result.question_index;
          data.answers_total = parseInt(result.answers_total);
          data.score = parseInt(result.score);
          data.updateCurrentQ();
          console.log('data: ', data);
          m.redraw(false);
        })
    }
  }
}

Question = {
  view: function (vnode) {
    if (data.current_question === null) { return false; }
    return m('.question_wrapper',
      m('.question', data.current_question.question),
      m(Choice, { index: 'a' }),
      m(Choice, { index: 'b' }),
      m(Choice, { index: 'c' }),
      m(Choice, { index: 'd' })
    )
  }
}

var Choice = {
  click: function (n) {
    return function () {
      data.selected = n
    }
  },
  classes: function (n) {
    if (data.selected === n) {
      return 'active'
    } else {
      return ''
    }
  },
  view: function (vnode) {
    var n = vnode.attrs.index
    return m('.choice', { class: Choice.classes(n), onclick: Choice.click(n) },
      m('span.l'),
      m('span.v', data.current_question[`option_${n}`])
    )
  }
}

const url_path = "/submit";
var App = {
  oninit: data.questions.fetch,
  reset: function () {
    m.request({
      method: "PUT",
      url: "/reset",
    })
      .then(function (result) {
        console.log('data', result);
        data.question_index = result.question_index;
        data.answers_total = parseInt(result.answers_total);
        data.score = parseInt(result.score);
        data.updateCurrentQ();
        data.selected = null;
        m.redraw(false);
      })
  },
  submit: function () {
    m.request({
      method: "PUT",
      url: "/submit",
      body: {
        question_id: data.question_index,
        choice: data.selected.toUpperCase()
      },
    })
      .then(function (result) {
        console.log('data', result);
        data.question_index = result.question_index;
        data.answers_total = parseInt(result.answers_total);
        data.score = parseInt(result.score);
        data.updateCurrentQ();
        data.selected = null;
        m.redraw(false);
      })
  },
  view: function () {
    return m('main', [
      m('h1', 'Study Sync'),
      m('article',
        m('h2', `Question ${data.answers_total + 1}:`),
        m(Question),
        m('.submit',
          m("button.submit", { onclick: App.submit }, 'Submit')
        )
      ),
      m('.progress',
        m('.total', `Total: ${data.answers_total + 1} / ${data.questions.list.length}`),
        m('.score', `Score: ${data.score} / ${data.questions.list.length}`)
      ),
      m('.reset_wrapper',
        m("button.reset", { onclick: App.reset }, 'Reset')
      )
    ])
  }
}

m.mount(document.body, App)
