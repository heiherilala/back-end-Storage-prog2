export const takeVauleObjectByNumber:(n: [number, number | null, number | null], o: Object) => string = (n:[number,number|null,number|null],o:Object)=>{
  if (n[1]==null&&n[2]==null) {
    const value = ""+(Object.entries(o)[n[0]])[1];
    return value;
  }
  else if (n[1]!=null&&n[2]==null) {
    const i = Object.entries(o)[n[0]][1];
    const value =""+(Object.entries(i)[n[1]])[1];
    return value;
  }
  else if (n[1]!=null&&n[2]!=null) {
    const i:undefined|any = Object.entries(o)[n[0]][1];
    if (i!=undefined) {
      const g:undefined|any = Object.entries(i)[n[1]][1];
      if (g!=undefined) {
        const value = ""+(Object.entries(g)[n[2]])[1];
        return value;
      }
    }
  } return ""
}

export const takeKeyObjectByNumber:(n: [number, number | null, number | null], o: Object) => string = (n:[number,number|null,number|null],o:Object)=>{
  if (n[1]==null&&n[2]==null) {
    const value =""+(Object.keys(o)[n[0]]);
    return value;
  }
  else if (n[1]!=null&&n[2]==null) {
    const i = Object.entries(o)[n[0]][1];
    const value =""+(Object.keys(i)[n[1]])[1];
    return value;
  }
  else if (n[1]!=null&&n[2]!=null) {
    const i:undefined|any = Object.entries(o)[n[0]][1];
    if (i!=undefined) {
      const g:undefined|any = Object.entries(i)[n[1]][1];
      if (g!=undefined) {
        const value = ""+(Object.keys(g)[n[2]])[1]
        return value;
      }
    }
  } return ""
}
