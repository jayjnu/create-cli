export interface Options {
  git: boolean;
  install: boolean;
  projectName: string;
  lang: string;
}

export type Argvs = Partial<Options> & {
  yes: boolean;
};

export type PromptOptions = {
  skipPrompt: boolean;
  argvs: Omit<Argvs, 'yes'>;
};