export interface BlogPost {
  id: string;
  title: string;
  date: string;
  abstract: string;
  introduction: string;
  sections: {
    title: string;
    content: string[];
  }[];
  conclusion: string;
  references: string[];
  imageKeyword: string;
}
