export interface BlogPost {
  id: string;
  category: string;
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
