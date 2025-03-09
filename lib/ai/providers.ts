import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { fireworks } from '@ai-sdk/fireworks';
import { isTestEnvironment } from '../constants';
import { deepseek, createDeepSeek } from '@ai-sdk/deepseek';

import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

// 创建一个 DeepSeek 客户端实例，避免重复创建
const deepseekClient = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_API_BASE || 'https://api.deepseek.com'
});

export const myProvider = customProvider({
      languageModels: {
        'chat-model-small': openai('gpt-4o-mini'),
        'chat-model-large': openai('gpt-4o'),
        'title-model': openai('gpt-4-turbo'),
        'artifact-model': openai('gpt-4o-mini'),
        'deepseek-chat': deepseekClient.languageModel('deepseek-chat'),
        // 尝试使用正确的模型名称，或者检查 DeepSeek 文档确认支持的模型
        'deepseek-r1': deepseekClient.languageModel('deepseek-coder'),
      },
      imageModels: {
        'small-model': openai.image('dall-e-2'),
        'large-model': openai.image('dall-e-3'),
      },
    });
