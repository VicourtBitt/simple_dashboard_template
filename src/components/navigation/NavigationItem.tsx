"use client";

import React, { useState } from "react";
import { 
  List, 
  ListItemButton, 
  ListItemText, 
  Collapse, 
  Divider, 
  IconButton,
  ListItemSecondaryAction,
  Box
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { Navigation } from "@/data/navigation";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useDrawer } from "@/context/DrawerContext";

interface NavigationItemProps {
  navigationObject: Navigation[];
}

export default function NavigationItem({ navigationObject }: NavigationItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const { closeDrawer } = useDrawer();
  
  const toggleExpand = (key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleNavigation = (path: string) => {
    router.push(path);
    closeDrawer();
  };
  
  const NavItem = ({ 
    item, 
    pathKey, 
    depth = 0 
  }: { 
    item: Navigation, 
    pathKey: string, 
    depth?: number 
  }) => {
    if (item.type === 'divider') {
      return <Divider key={pathKey} sx={{ my: 2 }}/>;
    }

    if (item.type === 'header') {
      return (
        <ListItemText 
          key={pathKey} 
          primary={item.title || ""} 
          sx={{ pl: 2 + depth * 2, color: 'text.secondary' }} 
        />
      );
    }
    
    if (item.type === 'external') {
      if (!item.path || !item.title) return null;
      return (
        <ListItemButton
          key={pathKey}
          onClick={() => window.open(item.path, "_blank")}
          sx={{ 
            pl: 2 + depth * 2,
            bgcolor: pathname === item.path ? 'action.selected' : 'inherit'
          }}
        >
          {item.icon && (
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </Box>
          )}
          <ListItemText primary={item.title} />
        </ListItemButton>
      );
    }

    const isExpanded = !!expandedItems[pathKey];
    const hasChildren = item.children && item.children.length > 0;
    const isActive = pathname === item.path;
    
    if (!hasChildren) {
      if (!item.path || !item.title) return null;
      return (
        <ListItemButton
          key={pathKey}
          onClick={() => handleNavigation(item.path || "")}
          sx={{ 
            pl: 2 + depth * 2,
            bgcolor: isActive ? 'action.selected' : 'inherit'
          }}
        >
          {item.icon && (
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </Box>
          )}
          <ListItemText primary={item.title} />
        </ListItemButton>
      );
    }
    
    return (
      <React.Fragment key={pathKey}>
        <ListItemButton 
          onClick={() => item.path && handleNavigation(item.path)}
          sx={{ 
            pl: 2 + depth * 2,
            pr: 4, // Space for the expand button
            bgcolor: isActive ? 'action.selected' : 'inherit'
          }}
        >
          {item.icon && (
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </Box>
          )}
          <ListItemText primary={item.title} />
          <ListItemSecondaryAction>
            <IconButton 
              edge="end" 
              onClick={(e) => toggleExpand(pathKey, e)}
              size="small"
            >
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItemButton>
        
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children?.map((child, index) => (
              <NavItem
                key={`${pathKey}-${index}`}
                item={child}
                pathKey={`${pathKey}-${index}`}
                depth={depth + 1}
              />
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };
  
  return (
    <List component="nav" sx={{ width: '100%' }}>
      {navigationObject.map((item, index) => (
        <NavItem 
          key={index}
          item={item}
          pathKey={`nav-${index}`}
        />
      ))}
    </List>
  );
}