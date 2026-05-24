import { cn } from '@/lib/utils';

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={cn('rounded-xl bg-brand px-4 py-2 font-medium text-black transition hover:opacity-90 disabled:opacity-50', props.className)} />;
}
