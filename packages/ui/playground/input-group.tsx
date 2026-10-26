import { useState } from "react";
import { ButtonPrimitive as Button } from "../src/button";
import { InputGroupPrimitive as Group } from "../src/input";
import { LabelPrimitive } from "../src/label";
import { Text } from "../src/text";
import type { DesignSystemComponent } from "../src/visualiser";

const groupClasses =
  "rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring/50 has-aria-invalid:border-destructive has-[[data-slot=input-group-control]:focus-visible]:outline-hidden";
const controlClasses =
  "bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";
const actionClasses =
  "rounded border border-input px-2 py-1 text-xs focus-visible:outline-2 focus-visible:outline-ring data-disabled:opacity-50";

export function useInputGroupExamples(): DesignSystemComponent {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [action, setAction] = useState("No action yet.");
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [preventFocus, setPreventFocus] = useState(false);
  const [addonClicks, setAddonClicks] = useState(0);
  const [loading, setLoading] = useState(false);

  return {
    id: "input-group",
    name: "Input Group",
    description: "Inputs with supporting text, icons and actions.",
    importCode:
      'import { InputGroupPrimitive as Group } from "@umahra/ui/input";',
    examples: [
      {
        title: "Primitive · optional prefix and suffix",
        usage:
          '<Group.Root>\n  <Group.Input aria-label="Website" />\n  <Group.Addon><Group.Text>https://</Group.Text></Group.Addon>\n  <Group.Addon align="inline-end"><Group.Text>.com</Group.Text></Group.Addon>\n</Group.Root>',
        preview: (
          <div className="project-preview space-y-3">
            <LabelPrimitive htmlFor="group-url" className="block text-sm">
              Website
            </LabelPrimitive>
            <Group.Root aria-label="Website address" className="gap-2">
              <Group.Input id="group-url" defaultValue="example" />
              <Group.Addon>
                <Group.Text>https://</Group.Text>
              </Group.Addon>
              <Group.Addon align="inline-end">
                <Group.Text>.com</Group.Text>
              </Group.Addon>
            </Group.Root>
            <Text className="text-sm text-muted-foreground">
              Click a text addon to focus the input. It also works with no
              addons.
            </Text>
            <Group.Root>
              <Group.Input
                aria-label="Input without addons"
                placeholder="Control on its own"
              />
            </Group.Root>
          </div>
        ),
      },
      {
        title: "Consumer wrapper · search and actions",
        usage:
          '<Group.Root>\n  <Group.Input aria-label="Search" value={query} onValueChange={setQuery} />\n  <Group.Addon align="inline-end"><Group.Button type="submit">Search</Group.Button></Group.Addon>\n</Group.Root>',
        preview: (
          <div className="project-preview space-y-3">
            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                setAction(
                  `Search submitted: ${data.get("query") ?? "(disabled input omitted)"}`,
                );
              }}
              onReset={() => {
                setQuery("");
                setAction("Search reset.");
              }}
            >
              <LabelPrimitive htmlFor="group-search" className="block text-sm">
                Search projects
              </LabelPrimitive>
              <Group.Root aria-label="Project search" className={groupClasses}>
                <Group.Input
                  id="group-search"
                  name="query"
                  value={query}
                  onValueChange={setQuery}
                  disabled={disabled}
                  aria-invalid={invalid || undefined}
                  aria-describedby="group-search-hint"
                  className={controlClasses}
                />
                <Group.Addon
                  className="ps-3 text-muted-foreground"
                  onClick={(event) => {
                    setAddonClicks((count) => count + 1);
                    if (preventFocus) event.preventDefault();
                  }}
                >
                  <Group.Text>Find</Group.Text>
                </Group.Addon>
                <Group.Addon align="inline-end" className="gap-2 pe-2">
                  <Group.Button
                    className={actionClasses}
                    aria-label="Clear project search"
                    onClick={() => {
                      setQuery("");
                      setAction("Search cleared.");
                    }}
                  >
                    ×
                  </Group.Button>
                  <Group.Button
                    type="submit"
                    disabled={disabled}
                    className={actionClasses}
                  >
                    Search
                  </Group.Button>
                </Group.Addon>
              </Group.Root>
              <Text
                id="group-search-hint"
                className={`text-sm ${invalid ? "text-destructive" : "text-muted-foreground"}`}
              >
                {invalid
                  ? "Example invalid search."
                  : "Buttons keep their own focus and form behavior."}
              </Text>
              <div className="flex flex-wrap gap-3 text-sm">
                <LabelPrimitive className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={disabled}
                    onChange={(event) => setDisabled(event.target.checked)}
                  />
                  Disable grouped input
                </LabelPrimitive>
                <LabelPrimitive className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={invalid}
                    onChange={(event) => setInvalid(event.target.checked)}
                  />
                  Invalid group
                </LabelPrimitive>
                <LabelPrimitive className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={preventFocus}
                    onChange={(event) => setPreventFocus(event.target.checked)}
                  />
                  Prevent addon focus
                </LabelPrimitive>
              </div>
              <Group.Button type="reset" className={actionClasses}>
                Reset search
              </Group.Button>
            </form>
            <Text className="text-sm text-muted-foreground" aria-live="polite">
              {action} Addon clicks: {addonClicks}.
            </Text>
          </div>
        ),
      },
      {
        title: "Block-start · header and textarea",
        usage:
          '<Group.Root>\n  <Group.Addon align="block-start"><Group.Text>Notes</Group.Text></Group.Addon>\n  <Group.Textarea aria-label="Notes" />\n</Group.Root>',
        preview: (
          <div className="project-preview space-y-3">
            <LabelPrimitive htmlFor="group-notes" className="block text-sm">
              Project notes
            </LabelPrimitive>
            <Group.Root
              aria-label="Project notes editor"
              className={groupClasses}
            >
              <Group.Textarea
                id="group-notes"
                defaultValue="A textarea with a header addon."
                className={`${controlClasses} min-h-24`}
              />
              <Group.Addon
                align="block-start"
                className="gap-2 border-b border-border px-3 py-2"
              >
                <Group.Text className="flex-1 text-xs text-muted-foreground">
                  notes.txt
                </Group.Text>
                <a href="#input-group" className="text-xs underline">
                  Editor help
                </a>
                <Group.Button
                  className={actionClasses}
                  onClick={() => setAction("Notes action activated.")}
                >
                  Action
                </Group.Button>
              </Group.Addon>
            </Group.Root>
          </div>
        ),
      },
      {
        title: "Block-end · message and optional loading",
        usage:
          '<Group.Root>\n  <Group.Textarea aria-label="Message" />\n  <Group.Addon align="block-end">\n    <Group.Text>Ready to send</Group.Text>\n    <Group.Button loading={loading}>Send</Group.Button>\n  </Group.Addon>\n</Group.Root>',
        preview: (
          <div className="project-preview space-y-3">
            <LabelPrimitive htmlFor="group-message" className="block text-sm">
              Message
            </LabelPrimitive>
            <Group.Root aria-label="Message composer" className={groupClasses}>
              <Group.Textarea
                id="group-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write a message…"
                className={`${controlClasses} min-h-24`}
              />
              <Group.Addon align="block-end" className="gap-2 px-3 pb-3">
                <Group.Text className="flex-1 text-xs text-muted-foreground">
                  {message.length} characters
                </Group.Text>
                <Group.Button
                  loading={loading}
                  className={actionClasses}
                  onClick={() => setAction("Message sent.")}
                >
                  <Button.Content>Send message</Button.Content>
                  <Button.Loader>
                    <span className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  </Button.Loader>
                </Group.Button>
              </Group.Addon>
            </Group.Root>
            <LabelPrimitive className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={loading}
                onChange={(event) => setLoading(event.target.checked)}
              />
              Loading group action
            </LabelPrimitive>
          </div>
        ),
      },
    ],
  };
}
