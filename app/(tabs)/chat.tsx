import { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';

const c = Colors.dark;

type Message = { id: string; role: 'user' | 'assistant'; text: string };

// Seed conversation so the screen visualizes properly before the API is wired
// up. Replace with real history (expo-sqlite) in the chat-history step.
const SEED: Message[] = [
  {
    id: '1',
    role: 'assistant',
    text: "Hi! I'm your assistant. Ask me anything to get started.",
  },
  { id: '2', role: 'user', text: 'What can you help me with?' },
  {
    id: '3',
    role: 'assistant',
    text: "Once I'm connected, I can answer questions, help plan your day, and keep track of things. For now this is just the UI — the AI connection is the next step.",
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(SEED);
  const [input, setInput] = useState('');
  const listRef = useRef<FlatList<Message>>(null);
  const canSend = input.trim().length > 0;

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: `${Date.now()}-u`, role: 'user', text };
    // No API yet — echo a canned reply so the send flow is visible.
    const reply: Message = {
      id: `${Date.now()}-a`,
      role: 'assistant',
      text: 'This is a placeholder reply. Connecting to the Anthropic API is the next checklist step.',
    };
    setMessages((prev) => [...prev, userMsg, reply]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}>
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <Bubble message={item} />}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        />
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Message"
            placeholderTextColor={c.hint}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, !canSend && styles.sendBtnDisabled]}
            onPress={send}
            disabled={!canSend}
            activeOpacity={0.8}>
            <IconSymbol name="arrow.up" size={20} color={c.accentText} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Bubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <View style={[styles.bubbleRow, isUser ? styles.rowUser : styles.rowAssistant]}>
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAssistant]}>
        <Text style={isUser ? styles.bubbleTextUser : styles.bubbleTextAssistant}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: c.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  title: {
    ...Type.title,
    color: c.text,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  bubbleRow: {
    flexDirection: 'row',
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  rowAssistant: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.lg,
  },
  bubbleUser: {
    backgroundColor: c.bubbleUser,
    borderBottomRightRadius: Radius.sm,
  },
  bubbleAssistant: {
    backgroundColor: c.bubbleAssistant,
    borderBottomLeftRadius: Radius.sm,
  },
  bubbleTextUser: {
    ...Type.body,
    color: c.bubbleUserText,
  },
  bubbleTextAssistant: {
    ...Type.body,
    color: c.bubbleAssistantText,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: c.border,
    backgroundColor: c.background,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: c.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: c.border,
    color: c.text,
    ...Type.body,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    backgroundColor: c.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.4,
  },
});
