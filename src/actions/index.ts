import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
    getAgent: defineAction({
        input: z.string(),
        handler: async (input) => {
            if (!input) {
                throw new ActionError({
                    code: 'UNAUTHORIZED',
                    message: 'Bearer token must be provided.'
                });
            }

            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${input}`
                }
            }

            const data = fetch('https://api.spacetraders.io/v2/my/agent', options)
            .then(response => response.json())
            .then(response => {return response.data})
            .catch(error => {return error})

            return data
        }
    }),

    getWaypoints: defineAction({
        input: z.object({
            systemSymbol: z.string(),
            waypointSymbol: z.string()
        }),
        handler: async (input) => {
            const options= {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${input}`
                }
            }

            const data = fetch(`https://api.spacetraders.io/v2/systems/${input.systemSymbol}/waypoints/${input.waypointSymbol}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                return response.data
            })
            .catch(error => {return error})

            return data
        }
    })
}