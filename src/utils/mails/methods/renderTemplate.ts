// renderTemplate.ts

import React from "react";
import {pretty, render} from "@react-email/render"

// Generic renderer for any React component
export async function renderTemplate<P>(
    Component: React.JSXElementConstructor<P>,
    props: P
): Promise<string> {
    const Element = React.createElement(Component, props);
    return await pretty(await render(Element));
}
