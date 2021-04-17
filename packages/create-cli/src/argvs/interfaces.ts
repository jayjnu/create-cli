export interface Options {
  git: boolean;
}

export type Argvs = Partial<Options> & {
  yes: boolean;
};

export type PromptOptions = {
  skipPrompt: boolean;
  argvs: Omit<Argvs, 'yes'>;
};
