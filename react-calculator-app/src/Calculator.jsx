import { useState } from 'react';

// ボタンの配置を表す配列（記述順に表示）
const buttons = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', 'C', '=', '+'
];

export function Calculator() {
    const [display, setState] = useState('');

    /* ボタンが押された時の処理 */
    function handleClick(btn){
        switch(btn) {
            case 'C':
                setState('');
                break;
            case '=':
                try {
                    const result = calculate(display);
                    if (!Number.isFinite(result)) {//infinity or NaN
                        throw new Error();
                    }
                    setState(result); // チェック済みの結果を表示
                } catch {
                    setState('エラー');
                }
                break;
            default:
                if(display == 'エラー'){ //エラー後に数字を押すとエラーが連結されてしまう問題の対処
                    setState(btn);
                } else {
                    setState(display+btn);
                }        
        }
    }
        
    /* 計算処理 引数としてexpression(計算式)を受け取る */
    function calculate(expression) {
        // 「整数 演算子 整数」の形式のみ許可
        const validExpression = /^(\d+)([+\-*/])(\d+)$/;

        // 有効な式であるかチェック
        const match = expression.match(validExpression);
        if (!match) {
            throw new Error('無効な式です。');
        }

        const num1 = Number(match[1]); // 1つ目の整数
        const operator = match[2]; // 演算子
        const num2 = Number(match[3]); // 2つ目の整数

        switch(operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '/':
                return num1 / num2;
            case '*':
                return num1 * num2;
        }
    }
    
  return (
    <header>
        <h2>電卓アプリ</h2>
        
        <div className='calculator-container'>{display ? display : 0}</div>
        <div className='button-grid'>{buttons.map((btn) => (
            <button className='button' key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}</div>
    </header>
  );
}