
// turn on/off using the dict.cc subject as a tag for the word.
var USE_SUBJECT_AS_TAG = true;

var translationData = [];

var runWhenjQuery = function(func) {
  if (window.jQuery) {
    func();
  } else {
    setTimeout(runWhenjQuery(func), 1000);
  }
};

// from lwt/glosbe_api.php
var addTranslation = function(rowNum) {
  var s = translationData[rowNum].translation;
  var w = window.parent.frames['ro'];
  if (typeof w == 'undefined') w = window.opener;
  if (typeof w == 'undefined') {
    alert ('Translation can not be copied!');
    return;
  }
  var c = w.document.forms[0].WoTranslation;
  if (typeof c != 'object') {
    alert ('Translation can not be copied!');
    return;
  }
  var oldValue = c.value;
  if (oldValue.trim() == '') {
    c.value = s;
    w.makeDirty();
  }
  else {
    if (oldValue.indexOf(s) == -1) {
      c.value = oldValue + ' / ' + s;
      w.makeDirty();
    }
    else {
      if (confirm('"' + s + '" seems already to exist as a translation.\nInsert anyway?')) {
        c.value = oldValue + ' / ' + s;
        w.makeDirty();
      }
    }
  }

  if (USE_SUBJECT_AS_TAG) {
    var tags = translationData[rowNum].tags;
    for (var i = 0; i < tags.length; i++) {
      addSubjectAsTag(tags[i]);
    }
  }
}

var editRow = function(rowNum) {
  var element = $(`#tr${rowNum}`);
  // add choose checkbox icon
  var transEls = element.find('td:nth-child(2)');
  transEls.children().removeAttr('href');

  // don't use text from DFN if present (the dict.cc category)
  // remove leading space
  var translation = transEls.contents().filter(function(){
    return this.tagName !== 'DFN';
  }).text().replace(/^\ /, '');

  translationData[rowNum] = {translation};

  if (USE_SUBJECT_AS_TAG) {
    translationData[rowNum].tags = transEls.find('dfn').map(function() {
      return this.innerHTML;
    });
  }

  var chooseBox = document.createElement('img');
  chooseBox.className = 'click';
  chooseBox.src = 'tick-button.png';
  chooseBox.title = 'Copy';
  chooseBox.alt = 'Copy';
  element.find('td')[1].prepend(chooseBox);

  // wrap with select translation span
  element.find('td:nth-child(2)').contents().wrapAll(`<span class='click' onclick="addTranslation(${rowNum})" />`);

  // change german links to within frame
  element.find('td:nth-child(3)').children().map(function(i, el) {
    if (!el.href) return;
    var splitEm = el.href.split('?');
    el.href = '/lwt/plugins/lwt-dict.cc/?' + splitEm.pop();
  });
};

var parseTable = function() {
  // get translation range
  var range = $('td[align=right] b')[0].innerHTML;
  range = range.split('-');
  var start = parseInt(range[0]);
  var end = parseInt(range[1]);

  // add click style
  var css = '.click:hover{cursor:pointer} .click{margin-right:5px}';
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  $('head').append(style);

  // edit links and add boxes
  for (var i = start; i <= end; i++) {
    editRow(i);
  }

  // Englisch link
  var eng = $('b:contains(Englisch):first > a')[0];
  eng.href = '/lwt/plugins/lwt-dict.cc/?' + eng.href.split('?')[1];

  // make thesaurus links relative to here
  var thesaurusLinks = $('table td>table a').filter(function() {
    var notJs = this.href.indexOf('javascript') < 0;
    var notThesaurus = this.href.indexOf('openthesaurus') < 0;
    return notJs && notThesaurus;
  });
  thesaurusLinks.map(function() {
    var query = this.href.split('?')[1];
    this.href = `/lwt/plugins/lwt-dict.cc/?${query}`;
  });
};

var subjects;
var fetchSubjects = function() {
  var req = new XMLHttpRequest();
  req.open('GET', 'subjects.json');
  req.onload = function(e) {
    subjects = JSON.parse(this.responseText);
  };
  req.send();
}
if (USE_SUBJECT_AS_TAG)
  fetchSubjects();

// insert the appropriate subject in tag field given subject abbreviation
var addSubjectAsTag = function(abbr) {
  var subject = subjects[abbr];
  var w = window.parent.frames['ro'];
  if (typeof w == 'undefined') w = window.opener;
  if (typeof w == 'undefined')
    return;
  var c = w.$('#termtags');

  // add tag if it doesn't already exist
  if (c.tagit('assignedTags').indexOf(subject) < 0) {
    c.tagit('createTag', subject);
    w.makeDirty();
  }
}

window.onload = runWhenjQuery(parseTable);
