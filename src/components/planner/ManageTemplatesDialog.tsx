'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { List, Trash2 } from "lucide-react";
import type { Template } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface ManageTemplatesDialogProps {
  templates: Template[];
  onRemoveTemplate: (id: string) => void;
}

export function ManageTemplatesDialog({ templates, onRemoveTemplate }: ManageTemplatesDialogProps) {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <List className="h-4 w-4" />
                <span className="sr-only">Manage Templates</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Manage Task Templates</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Task Templates</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-4">
          {templates.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No templates created yet.</p>
          ) : (
            <ul className="space-y-2">
              {templates.map((template) => (
                <li key={template.id} className="flex items-center justify-between p-2 rounded-md border bg-background hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: template.color }}></div>
                    <div>
                      <p className="font-medium">{template.title}</p>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => onRemoveTemplate(template.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Delete template</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Template</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
