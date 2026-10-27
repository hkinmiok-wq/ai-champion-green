// 제공된 스타터의 데이터.js(전역 변수 '보도자료')를 직접 읽습니다.
// fetch를 사용하지 않아 파일을 더블클릭해도 실행됩니다.
const data = 보도자료;
const q = document.getElementById('q');
const list = document.getElementById('list');
const count = document.getElementById('count');
const clear = document.getElementById('clear');

const normalize = value => String(value ?? '').toLocaleLowerCase('ko-KR');
const clip = (value, maxLength = 150) => value.length > maxLength ? value.slice(0, maxLength) + '…' : value;

function makeCard(article) {
  const card = document.createElement('article');
  card.className = 'card';
  const department = document.createElement('span');
  department.className = 'label';
  department.textContent = article.부처;
  const title = document.createElement('h3');
  title.className = 'title';
  title.textContent = article.제목;
  const preview = document.createElement('p');
  preview.className = 'body';
  const body = String(article.본문 ?? '');
  preview.textContent = clip(body.replace(/^# .*?\n+/, '').trim());
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  summary.textContent = '보도자료 전체 본문 열람';
  const full = document.createElement('div');
  full.className = 'full-body';
  full.textContent = body; // 텍스트 그대로 출력하여 HTML 코드 삽입 방지
  details.append(summary, full);
  card.append(department, title, preview, details);
  return card;
}
function render(items) {
  count.textContent = `결과 ${items.length}건`;
  list.replaceChildren();
  if (items.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = '검색 결과가 없습니다. 다른 검색어를 입력해 보세요.';
    list.append(empty);
    return;
  }
  const fragment = document.createDocumentFragment();
  items.forEach(item => fragment.append(makeCard(item)));
  list.append(fragment);
}
function search() {
  const kw = normalize(q.value.trim());
  const filtered = kw ? data.filter(item =>
    [item.본문, item.제목, item.부처].some(value => normalize(value).includes(kw))
  ) : data;
  render(filtered);
}
q.addEventListener('input', search);
clear.addEventListener('click', () => { q.value = ''; search(); q.focus(); });
render(data);
