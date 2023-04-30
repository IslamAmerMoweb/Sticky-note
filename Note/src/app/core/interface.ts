export interface note {
  filter(arg0: (note: any) => any): any[];
  title: string;
  desc: string;
  _id: string;
}

export interface findNotes {
  _id: string;
  token: string;
}
