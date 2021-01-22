module Main exposing (main)

import Browser
import Html exposing (Html, div, text)
import Html.Events exposing (onClick)


type alias Model =
    Int


type Msg
    = NoOps


update : Msg -> Model -> Model
update msg model =
    case msg of
        _ ->
            model


view : Model -> Html Msg
view model =
    div []
        [ text "hello world"
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = 1
        , view = view
        , update = update
        }
