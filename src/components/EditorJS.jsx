// src/components/EditorJSComponent.jsx
import React, { useEffect, useRef } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'

const EditorJSComponent = ({ onChange, data }) => {
    const ejInstance = useRef()

    useEffect(() => {
        if (!ejInstance.current) {
            ejInstance.current = new EditorJS({
                holder: 'editorjs',
                tools: {
                    header: Header,
                    list: List,
                    paragraph: Paragraph,
                },
                data: data,
                onChange: async () => {
                    const content = await ejInstance.current.save()
                    onChange(content)
                },
            })
        }

        return () => {
            ejInstance.current?.destroy()
            ejInstance.current = null
        }
    }, [])

    return <div id="editorjs" className="bg-white p-4 rounded-md" />
}

export default EditorJSComponent
