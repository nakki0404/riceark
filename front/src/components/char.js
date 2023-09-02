function char (props) {

var xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open("GET", "https://developer-lostark.game.onstove.com/characters/%EB%B2%9E%EC%8B%BC/siblings", true);
xmlHttpRequest.setRequestHeader('accept', 'application/json');
xmlHttpRequest.setRequestHeader('authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxNDQ2MzkifQ.mYsj_wkn91cxGt1Y2WPyZmJR3rdbu3NwtSg500oj91Su6Quqvn3msXQcD_jPhOThRH_pLKLDT9_Z0c3cqZWZD2p1Uizs9azDWroo3nDXQzjcqLYPNUDGTdnge7QRBSk2iPJuRRyo6n99rMAsD1H7gCtpQF5OCiyUeq3WPv4klovdd0oqpWDf7-0FNUUf-s3NR5qk1guD_f7-lpbZUptq2cwHfsJfH0pX5cnfCG3017Hd30ZaLXJ2M4X3P3vfpUkmEwsIMGcPrQjHGfcIz9kU2rH65ZoowIIwN1tWUAwrXBBvvrTPE2W7V6Mqex-5yiFF5SN9HEVl9d1COQpDrDbngA');
xmlHttpRequest.onreadystatechange = () => { };
xmlHttpRequest.send();


return console.log(xmlHttpRequest);
}
export default char